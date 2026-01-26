import Link from "next/link";

export default function ConfidentialitePage() {
  return (
    <main className="pt-[160px] min-h-screen bg-white">
      <div className="px-[3vw] pb-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-8">
          Politique de Confidentialité
        </h1>

        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour : Janvier 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Zellem s&apos;engage à protéger votre vie privée. Cette politique de confidentialité
              explique comment nous collectons, utilisons et protégeons vos données personnelles
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Responsable du traitement</h2>
            <p className="text-gray-600 leading-relaxed">
              Le responsable du traitement des données personnelles est :<br /><br />
              <strong>Zellem</strong><br />
              Artiste peintre<br />
              Contact : <Link href="/contact" className="text-black hover:underline">Page de contact</Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Données collectées</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous collectons les données suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Données de livraison :</strong> adresse postale</li>
              <li><strong>Données de paiement :</strong> traitées de manière sécurisée par Stripe (nous ne stockons pas vos données bancaires)</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (via cookies techniques)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Finalités du traitement</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vos données sont collectées pour :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Traiter et livrer vos commandes</li>
              <li>Gérer la relation client et répondre à vos demandes</li>
              <li>Établir les factures et documents comptables</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Base légale</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement de vos données repose sur :<br />
              - L&apos;exécution du contrat (commandes)<br />
              - Votre consentement (formulaire de contact, newsletter)<br />
              - Nos obligations légales (conservation des factures)<br />
              - Notre intérêt légitime (amélioration des services)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Destinataires des données</h2>
            <p className="text-gray-600 leading-relaxed">
              Vos données peuvent être partagées avec :<br />
              - <strong>Stripe</strong> : pour le traitement sécurisé des paiements<br />
              - <strong>Transporteurs</strong> : pour la livraison de vos commandes<br />
              - <strong>Vercel</strong> : hébergeur du site<br /><br />
              Nous ne vendons jamais vos données à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Durée de conservation</h2>
            <p className="text-gray-600 leading-relaxed">
              - <strong>Données clients :</strong> 3 ans après la dernière commande<br />
              - <strong>Données de facturation :</strong> 10 ans (obligation légale)<br />
              - <strong>Données de contact :</strong> 3 ans après le dernier contact<br />
              - <strong>Cookies :</strong> 13 mois maximum
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> supprimer vos données (dans certaines conditions)</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format lisible</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous via notre{" "}
              <Link href="/contact" className="text-black hover:underline">page de contact</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ce site utilise des cookies :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (panier, session)</li>
              <li><strong>Cookies de performance :</strong> pour améliorer l&apos;expérience utilisateur</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Sécurité</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, modification, divulgation ou
              destruction. Le site utilise le protocole HTTPS pour sécuriser les échanges de données.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Réclamation</h2>
            <p className="text-gray-600 leading-relaxed">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) :
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-black hover:underline ml-1">
                www.cnil.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Cette politique de confidentialité peut être mise à jour. La date de dernière mise
              à jour est indiquée en haut de cette page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question concernant cette politique ou vos données personnelles,
              contactez-nous via notre{" "}
              <Link href="/contact" className="text-black hover:underline">page de contact</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
