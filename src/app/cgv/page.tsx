import Link from "next/link";

export default function CGVPage() {
  return (
    <main className="pt-[160px] min-h-screen bg-white">
      <div className="px-[3vw] pb-16 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-8">
          Conditions Générales de Vente
        </h1>

        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour : Janvier 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 1 - Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes d&apos;œuvres d&apos;art
              originales réalisées par l&apos;artiste Zellem via le site zellem.art. Toute commande implique
              l&apos;acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 2 - Produits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les œuvres proposées à la vente sont des créations originales, uniques et signées par
              l&apos;artiste Zellem. Chaque œuvre est accompagnée d&apos;un certificat d&apos;authenticité.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Les photographies des œuvres sont les plus fidèles possibles mais ne peuvent assurer
              une similitude parfaite avec le produit, notamment en ce qui concerne les couleurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 3 - Prix</h2>
            <p className="text-gray-600 leading-relaxed">
              Les prix sont indiqués en euros (€) toutes taxes comprises. Les frais de livraison
              sont indiqués séparément lors de la commande et varient selon la destination et les
              dimensions de l&apos;œuvre. L&apos;artiste se réserve le droit de modifier ses prix à tout moment,
              les œuvres étant facturées sur la base des tarifs en vigueur au moment de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 4 - Commande</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La commande est validée après confirmation par email et réception du paiement intégral.
              Une facture sera envoyée par email à l&apos;acheteur.
            </p>
            <p className="text-gray-600 leading-relaxed">
              L&apos;artiste se réserve le droit de refuser une commande pour tout motif légitime,
              notamment en cas de problème de paiement ou de litige antérieur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 5 - Paiement</h2>
            <p className="text-gray-600 leading-relaxed">
              Le paiement s&apos;effectue par carte bancaire via notre plateforme sécurisée Stripe,
              ou par virement bancaire. Le paiement en plusieurs fois peut être proposé pour les
              œuvres d&apos;un montant supérieur à 1000€, sur demande préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 6 - Livraison</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les œuvres sont expédiées dans un délai de 7 à 15 jours ouvrés après réception du
              paiement. Chaque œuvre est soigneusement emballée pour garantir une protection optimale
              durant le transport.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              La livraison est effectuée à l&apos;adresse indiquée par l&apos;acheteur lors de la commande.
              Un numéro de suivi sera communiqué par email dès l&apos;expédition.
            </p>
            <p className="text-gray-600 leading-relaxed">
              En cas de dommage constaté à la réception, l&apos;acheteur doit émettre des réserves
              auprès du transporteur et nous contacter dans les 48 heures avec photos à l&apos;appui.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 7 - Droit de rétractation</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément à l&apos;article L221-18 du Code de la consommation, l&apos;acheteur dispose d&apos;un
              délai de 14 jours à compter de la réception de l&apos;œuvre pour exercer son droit de
              rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <p className="text-gray-600 leading-relaxed">
              L&apos;œuvre doit être retournée dans son emballage d&apos;origine, en parfait état. Les frais
              de retour sont à la charge de l&apos;acheteur. Le remboursement sera effectué dans un délai
              de 14 jours suivant la réception de l&apos;œuvre retournée.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 8 - Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              L&apos;achat d&apos;une œuvre confère à l&apos;acheteur la propriété matérielle de celle-ci.
              Les droits de reproduction et de représentation restent la propriété exclusive de l&apos;artiste.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Toute reproduction, même partielle, de l&apos;œuvre à des fins commerciales est strictement
              interdite sans autorisation écrite préalable de l&apos;artiste.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 9 - Droit de suite</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément à l&apos;article L122-8 du Code de la propriété intellectuelle, l&apos;artiste
              bénéficie d&apos;un droit de suite en cas de revente de l&apos;œuvre par un professionnel du
              marché de l&apos;art (galeries, maisons de ventes).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 10 - Garantie</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;acheteur bénéficie de la garantie légale de conformité (articles L217-4 et suivants
              du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants
              du Code civil).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 11 - Litiges</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée avant toute action judiciaire.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Conformément aux dispositions du Code de la consommation concernant le règlement
              amiable des litiges, l&apos;acheteur peut recourir au service de médiation proposé par
              la plateforme européenne de règlement en ligne des litiges :
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-black hover:underline ml-1">
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light tracking-[0.05em] mb-4">Article 12 - Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question concernant ces CGV ou votre commande, vous pouvez nous contacter via
              notre <Link href="/contact" className="text-black hover:underline">page de contact</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
