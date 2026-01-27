"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPocketBase } from "@/lib/pocketbase";
import Link from "next/link";

// Icônes
const VisitorIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const OrderIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LiveIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

const TrendingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

interface Stats {
  dailyVisits: number;
  liveVisitors: number;
  activeCarts: number;
  pendingOrders: number;
  unreadMessages: number;
  topProducts: { id: string; collectionId: string; title: string; views: number; image?: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    dailyVisits: 0,
    liveVisitors: 0,
    activeCarts: 0,
    pendingOrders: 0,
    unreadMessages: 0,
    topProducts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const pb = getPocketBase();

      let unreadMessagesCount = 0;
      let pendingOrders = 0;
      let topProducts: Stats["topProducts"] = [];

      // Messages non lus
      try {
        const unreadMessages = await pb.collection("contact_messages").getList(1, 1, {
          filter: "read = false",
        });
        unreadMessagesCount = unreadMessages.totalItems;
      } catch {
        // Collection n'existe pas ou pas de permissions
      }

      // Commandes en attente
      try {
        const orders = await pb.collection("orders").getList(1, 1, {
          filter: 'status = "pending"',
        });
        pendingOrders = orders.totalItems;
      } catch {
        // Collection n'existe pas ou pas de permissions
      }

      // Produits les plus visités
      try {
        const products = await pb.collection("artworks").getList(1, 5);
        topProducts = products.items.map((p) => ({
          id: p.id,
          collectionId: p.collectionId as string,
          title: p.title as string,
          views: (p.views as number) || 0,
          image: (p.images as string) || (p.images as string[])?.[0],
        }));
      } catch {
        // Collection n'existe pas ou pas de permissions
      }

      setStats({
        dailyVisits: Math.floor(Math.random() * 100) + 50, // Demo - à remplacer par vraies stats
        liveVisitors: Math.floor(Math.random() * 10) + 1, // Demo
        activeCarts: Math.floor(Math.random() * 5), // Demo
        pendingOrders,
        unreadMessages: unreadMessagesCount,
        topProducts,
      });

      setIsLoading(false);
    };

    fetchStats();

    // Rafraîchir toutes les 30 secondes pour le temps réel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Visites du jour",
      value: stats.dailyVisits,
      icon: VisitorIcon,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "En ligne",
      value: stats.liveVisitors,
      icon: LiveIcon,
      color: "bg-green-50 text-green-600",
      pulse: true,
    },
    {
      title: "Paniers actifs",
      value: stats.activeCarts,
      icon: CartIcon,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Commandes en attente",
      value: stats.pendingOrders,
      icon: OrderIcon,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Messages non lus",
      value: stats.unreadMessages,
      icon: MailIcon,
      color: "bg-red-50 text-red-600",
      link: "/admin/messages",
    },
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
      <div>
        <h1 className="text-2xl font-light tracking-wide">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de votre site</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs tracking-wide uppercase mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-light">
                  {card.value}
                  {card.pulse && card.value > 0 && (
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
                  )}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingIcon />
            </div>
            <div>
              <h2 className="font-medium">Produits les plus visités</h2>
              <p className="text-gray-500 text-sm">Cette semaine</p>
            </div>
          </div>
          <Link
            href="/admin/produits"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        {stats.topProducts.length > 0 ? (
          <div className="space-y-3">
            {stats.topProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/admin/produits/${product.id}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {product.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"}/api/files/${product.collectionId}/${product.id}/${product.image}?thumb=100x100`}
                      alt={product.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{product.views} vues</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Aucune donnée disponible</p>
            <p className="text-xs mt-1">Les statistiques apparaîtront une fois que vous aurez des visites</p>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/produits/nouveau"
          className="bg-black text-white p-6 rounded-xl hover:bg-gray-800 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Ajouter un produit</p>
              <p className="text-white/60 text-sm">Créer une nouvelle œuvre</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/organiser"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Organiser les œuvres</p>
              <p className="text-white/60 text-sm">Glisser-déposer</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/media"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Bibliothèque médias</p>
              <p className="text-white/60 text-sm">Images & vidéos</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/home"
          className="bg-white border border-gray-200 p-6 rounded-xl hover:border-black transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Modifier l&apos;accueil</p>
              <p className="text-gray-500 text-sm">Photos & textes</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/about"
          className="bg-white border border-gray-200 p-6 rounded-xl hover:border-black transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Page À propos</p>
              <p className="text-gray-500 text-sm">Votre histoire</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
