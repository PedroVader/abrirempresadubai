import { Building2, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent rounded-lg">
                <Building2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">AbrirEmpresaDubai.es</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Expertos en constitución de empresas en Dubai. 
              Te ayudamos a aprovechar las ventajas fiscales de los Emiratos Árabes Unidos.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Constitución de Empresas</li>
              <li>Asesoría Legal</li>
              <li>Visas de Residencia</li>
              <li>Apertura Bancaria</li>
              <li>Domicilio Fiscal</li>
              <li>Mantenimiento</li>
            </ul>
          </div>

          {/* Free Zones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Free Zones</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>DIFC</li>
              <li>DMCC</li>
              <li>DAFZA</li>
              <li>JAFZA</li>
              <li>Dubai South</li>
              <li>Mainland</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@abrirempresadubai.es</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/60 text-sm">
              © 2025 AbrirEmpresaDubai.es. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;