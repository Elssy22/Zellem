import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <main className="pt-[160px] min-h-screen bg-white">
      <div className="px-[3vw] pb-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-8">
          Mentions Légales
        </h1>

        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour : Janvier 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Éditeur du site</h2>
            <p className="text-gray-600 leading-relaxed">
              Le site zellem.art est édité par :<br /><br />
              <strong>Zellem</strong><br />
              Artiste peintre - Entreprise individuelle<br />
              {/* TODO: Ajouter l'adresse */}
              [Adresse à compléter]<br />
              France<br /><br />
              Email : <Link href="/contact" className="text-black hover:underline">Nous contacter</Link><br />
              {/* TODO: Ajouter le SIRET si applicable */}
              SIRET : [À compléter si applicable]
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Directeur de la publication</h2>
            <p className="text-gray-600 leading-relaxed">
              Zellem, en qualité d&apos;artiste et éditeur du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Hébergement</h2>
            <p className="text-gray-600 leading-relaxed">
              Le site est hébergé par :<br /><br />
              <strong>OVH SAS</strong><br />
              2 rue Kellermann<br />
              59100 Roubaix<br />
              France<br />
              Téléphone : 1007<br />
              Site web : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">ovhcloud.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L&apos;ensemble du contenu de ce site (textes, images, photographies, illustrations, logo,
              œuvres d&apos;art) est la propriété exclusive de Zellem ou fait l&apos;objet d&apos;une autorisation
              d&apos;utilisation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou
              partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite,
              sauf autorisation écrite préalable de Zellem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Crédits</h2>
            <p className="text-gray-600 leading-relaxed">
              Conception et développement du site : Zellem<br />
              Photographies des œuvres : Zellem<br />
              Toutes les œuvres présentées sont des créations originales de l&apos;artiste Zellem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Données personnelles</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute information concernant la collecte et le traitement de vos données
              personnelles, veuillez consulter notre{" "}
              <Link href="/confidentialite" className="text-black hover:underline">
                Politique de Confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
              Pour plus d&apos;informations, consultez notre{" "}
              <Link href="/confidentialite" className="text-black hover:underline">
                Politique de Confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Limitation de responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              Zellem s&apos;efforce de fournir des informations aussi précises que possible sur ce site.
              Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes ou
              des carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers
              partenaires qui lui fournissent ces informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question concernant ce site, vous pouvez nous contacter via notre{" "}
              <Link href="/contact" className="text-black hover:underline">page de contact</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
