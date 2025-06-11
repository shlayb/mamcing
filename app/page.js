import Hero from '@/components/hero';
import Mam from '@/components/mam';
import KasihMam from '@/components/kasihmam';
import Log from '@/components/log';

export default function Home() {
  return (
    <div>
      <div id="Hero">
        <Hero />
      </div>
      <div id="Kasihmam">
        <Mam />
      </div>
      <div id="Settingmam">
        <KasihMam />
      </div>
      <div id="Lihatmam">
        <Log />
      </div>
    </div>
  );
}
