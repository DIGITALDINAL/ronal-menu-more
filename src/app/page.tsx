import { MenuTabs } from '@/components/MenuTabs';
import { AiSuggestions } from '@/components/AiSuggestions';
import { TableNumberDialog } from '@/components/TableNumberDialog';

export default function Home() {
  return (
    <>
      <TableNumberDialog />
      <div className="container mx-auto px-4 py-8">
        <section className="relative text-center rounded-lg overflow-hidden mb-12 bg-card p-8 shadow-lg">
          <div className="absolute inset-0 bg-primary/20 z-0"></div>
          <div className="relative z-10">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-2">
              Ronal's Menu & More
            </h1>
            <p className="font-body text-lg md:text-xl text-card-foreground">
              Experience culinary excellence. Fresh ingredients, bold flavors.
            </p>
          </div>
        </section>

        <AiSuggestions />

        <section>
          <h2 className="font-headline text-4xl text-center mb-8 text-primary">Our Menu</h2>
          <MenuTabs />
        </section>
      </div>
    </>
  );
}
