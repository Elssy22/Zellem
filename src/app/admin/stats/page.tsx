"use client";

import { useState, useEffect, useCallback } from "react";
import { getPocketBase } from "@/lib/pocketbase";

// Types
interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  pagesPerSession: number;
  topPages: { path: string; views: number }[];
  topArtworks: { id: string; title: string; views: number }[];
  sources: { source: string; percentage: number }[];
  devices: { device: string; percentage: number }[];
  countries: { country: string; percentage: number }[];
}

type Period = "7d" | "30d" | "90d" | "12m";

// Icons
const VisitorsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PageViewsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const BounceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PagesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const DeviceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// Format duration in human-readable format
const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export default function AdminStatsPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnalytics, setHasAnalytics] = useState(false);
  const [data, setData] = useState<AnalyticsData>({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    pagesPerSession: 0,
    topPages: [],
    topArtworks: [],
    sources: [],
    devices: [],
    countries: [],
  });

  const fetchArtworkViews = useCallback(async () => {
    const pb = getPocketBase();
    try {
      const artworks = await pb.collection("artworks").getList(1, 10, {
        sort: "-views",
      });
      return artworks.items.map((a) => ({
        id: a.id,
        title: a.title as string,
        views: (a.views as number) || 0,
      }));
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // Check if GA is configured (we'll need environment variable)
      const gaConfigured = typeof window !== "undefined" &&
        // @ts-expect-error - gtag is added by GA script
        typeof window.gtag !== "undefined";

      setHasAnalytics(gaConfigured);

      // Fetch artwork views from PocketBase
      const topArtworks = await fetchArtworkViews();

      if (!gaConfigured) {
        // Demo data when GA is not configured
        setData({
          visitors: 0,
          pageViews: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          pagesPerSession: 0,
          topPages: [],
          topArtworks,
          sources: [],
          devices: [],
          countries: [],
        });
      } else {
        // When GA is configured, we would fetch real data
        // For now, show the artwork views from PocketBase
        setData((prev) => ({
          ...prev,
          topArtworks,
        }));
      }

      setIsLoading(false);
    };

    loadData();
    // Note: period is included for future GA integration
    // fetchArtworkViews doesn't use period but is called in loadData
  }, [period, fetchArtworkViews]);

  const periods: { key: Period; label: string }[] = [
    { key: "7d", label: "7 jours" },
    { key: "30d", label: "30 jours" },
    { key: "90d", label: "90 jours" },
    { key: "12m", label: "12 mois" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Statistiques</h1>
          <p className="text-gray-500 text-sm mt-1">
            Analysez les performances de votre site
          </p>
        </div>

        {/* Period selector */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                period === p.key
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Google Analytics Setup Notice */}
      {!hasAnalytics && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-2">
                Configurez Google Analytics pour voir vos statistiques
              </h3>
              <p className="text-blue-700 text-sm mb-4">
                Pour afficher les données de trafic (visiteurs, pages vues, taux de rebond, etc.),
                vous devez configurer Google Analytics 4 sur votre site.
              </p>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-sm mb-2">Instructions :</h4>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>
                    Créez un compte{" "}
                    <a
                      href="https://analytics.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Analytics
                    </a>
                  </li>
                  <li>Créez une propriété GA4 pour votre site (zellem.art)</li>
                  <li>Copiez l&apos;ID de mesure (format: G-XXXXXXXXXX)</li>
                  <li>
                    Ajoutez la variable d&apos;environnement{" "}
                    <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_GA_ID</code>{" "}
                    dans votre fichier .env.local
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                Visiteurs uniques
              </p>
              <p className="text-2xl font-light">
                {hasAnalytics ? data.visitors.toLocaleString("fr-FR") : "—"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <VisitorsIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                Pages vues
              </p>
              <p className="text-2xl font-light">
                {hasAnalytics ? data.pageViews.toLocaleString("fr-FR") : "—"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <PageViewsIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                Taux de rebond
              </p>
              <p className="text-2xl font-light">
                {hasAnalytics ? `${data.bounceRate.toFixed(1)}%` : "—"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
              <BounceIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                Durée moyenne
              </p>
              <p className="text-2xl font-light">
                {hasAnalytics ? formatDuration(data.avgSessionDuration) : "—"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <ClockIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                Pages / session
              </p>
              <p className="text-2xl font-light">
                {hasAnalytics ? data.pagesPerSession.toFixed(1) : "—"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <PagesIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <PageViewsIcon />
            </div>
            <div>
              <h2 className="font-medium">Pages les plus visitées</h2>
              <p className="text-gray-500 text-sm">Top 5 des pages</p>
            </div>
          </div>

          {hasAnalytics && data.topPages.length > 0 ? (
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{page.path}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {page.views.toLocaleString("fr-FR")} vues
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {hasAnalytics
                  ? "Aucune donnée disponible"
                  : "Configurez Google Analytics"}
              </p>
            </div>
          )}
        </div>

        {/* Top Artworks */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium">Œuvres les plus populaires</h2>
              <p className="text-gray-500 text-sm">Top 5 des œuvres</p>
            </div>
          </div>

          {data.topArtworks.length > 0 ? (
            <div className="space-y-3">
              {data.topArtworks.slice(0, 5).map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{artwork.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {artwork.views.toLocaleString("fr-FR")} vues
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Aucune donnée disponible</p>
            </div>
          )}
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <LinkIcon />
            </div>
            <div>
              <h2 className="font-medium">Sources de trafic</h2>
              <p className="text-gray-500 text-sm">D&apos;où viennent vos visiteurs</p>
            </div>
          </div>

          {hasAnalytics && data.sources.length > 0 ? (
            <div className="space-y-4">
              {data.sources.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{source.source}</span>
                    <span className="text-gray-500">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {hasAnalytics
                  ? "Aucune donnée disponible"
                  : "Configurez Google Analytics"}
              </p>
            </div>
          )}
        </div>

        {/* Devices */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <DeviceIcon />
            </div>
            <div>
              <h2 className="font-medium">Appareils</h2>
              <p className="text-gray-500 text-sm">Types d&apos;appareils utilisés</p>
            </div>
          </div>

          {hasAnalytics && data.devices.length > 0 ? (
            <div className="space-y-4">
              {data.devices.map((device) => (
                <div key={device.device}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{device.device}</span>
                    <span className="text-gray-500">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {hasAnalytics
                  ? "Aucune donnée disponible"
                  : "Configurez Google Analytics"}
              </p>
            </div>
          )}
        </div>

        {/* Countries */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <GlobeIcon />
            </div>
            <div>
              <h2 className="font-medium">Pays / Régions</h2>
              <p className="text-gray-500 text-sm">Provenance géographique de vos visiteurs</p>
            </div>
          </div>

          {hasAnalytics && data.countries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.countries.map((country) => (
                <div key={country.country}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{country.country}</span>
                    <span className="text-gray-500">{country.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">
                {hasAnalytics
                  ? "Aucune donnée disponible"
                  : "Configurez Google Analytics"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
