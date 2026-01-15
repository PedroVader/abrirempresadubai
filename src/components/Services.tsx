import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  FileText, 
  Users, 
  CreditCard, 
  Globe, 
  Shield,
  ArrowRight 
} from "lucide-react";

const Services = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const services = [
    {
      icon: Building2,
      title: "Constitución de Empresas",
      description: "Setup completo de tu empresa en Free Zones o Mainland Dubai con todos los permisos necesarios.",
      features: ["Licencia comercial", "Registro mercantil", "Apertura bancaria"]
    },
    {
      icon: FileText,
      title: "Asesoría Legal",
      description: "Servicios legales especializados para asegurar el cumplimiento total de la normativa.",
      features: ["Contratos", "Compliance", "Documentación"]
    },
    {
      icon: Users,
      title: "Visas de Residencia",
      description: "Gestión completa de visas para inversores, empleados y familiares.",
      features: ["Visa de inversor", "Visas de trabajo", "Renovaciones"]
    },
    {
      icon: CreditCard,
      title: "Asesoramiento Fiscal Internacional",
      description: "Consultoría especializada en estructuras fiscales internacionales de confianza.",
      features: ["Holdings internacionales", "Offshoring estratégico", "Optimización fiscal global"]
    },
    {
      icon: Globe,
      title: "Domicilio Fiscal",
      description: "Dirección comercial prestigiosa en Dubai para tu empresa.",
      features: ["Dirección comercial", "Servicio de correo", "Sala de reuniones"]
    },
    {
      icon: Shield,
      title: "Mantenimiento",
      description: "Servicios continuos para mantener tu empresa en regla y operativa.",
      features: ["Renovaciones", "Contabilidad", "Soporte 24/7"]
    }
  ];

  return (
    <section className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Servicios Integrales para tu
            <span className="bg-primary-gradient bg-clip-text text-transparent"> Empresa en Dubai</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Te acompañamos en cada paso del proceso, desde la constitución hasta 
            el mantenimiento continuo de tu empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary-gradient rounded-xl group-hover:shadow-glow transition-all duration-300">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-primary/5 transition-colors"
                  onClick={() => scrollToSection('contact')}
                >
                  Más información
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg"
            onClick={() => scrollToSection('contact')}
          >
            Solicitar Consulta Personalizada
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;