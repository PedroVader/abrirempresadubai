import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  FileCheck, 
  Building2, 
  CreditCard, 
  CheckCircle,
  ArrowRight,
  Clock
} from "lucide-react";

const Process = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const steps = [
    {
      icon: MessageCircle,
      title: "Consulta Inicial",
      description: "Evaluamos tu caso y te asesoramos sobre la mejor estructura empresarial.",
      duration: "1 día",
      details: ["Análisis de necesidades", "Selección de Free Zone", "Presupuesto personalizado"]
    },
    {
      icon: FileCheck,
      title: "Documentación",
      description: "Preparamos y procesamos toda la documentación necesaria.",
      duration: "3-5 días",
      details: ["Formularios oficiales", "Poderes notariales", "Certificaciones"]
    },
    {
      icon: Building2,
      title: "Registro Empresarial",
      description: "Registramos oficialmente tu empresa y obtenemos las licencias.",
      duration: "7-14 días",
      details: ["Licencia comercial", "Registro mercantil", "Certificado de establecimiento"]
    },
    {
      icon: CreditCard,
      title: "Apertura Bancaria",
      description: "Gestionamos la apertura de tu cuenta bancaria corporativa.",
      duration: "5-10 días",
      details: ["Cuenta corporativa", "Internet banking", "Tarjetas de empresa"]
    },
    {
      icon: CheckCircle,
      title: "Entrega Final",
      description: "Tu empresa está lista para operar. Te entregamos todo completo.",
      duration: "1 día",
      details: ["Documentos finales", "Accesos bancarios", "Soporte continuo"]
    }
  ];

  return (
    <section className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Proceso Simple y
            <span className="bg-primary-gradient bg-clip-text text-transparent"> Transparente</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Te guiamos paso a paso para que tengas tu empresa operativa en Dubai 
            en menos de 10 días, sin complicaciones.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Tiempo total: 7-10 días</span>
          </div>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-[calc(100%-10rem)] bg-gradient-to-b from-primary via-accent to-primary opacity-20"></div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center shadow-elegant">
                    <span className="text-primary-foreground font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:order-2'}`}>
                    <Card className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-elegant transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-primary-gradient rounded-xl">
                            <step.icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-card-foreground">{step.title}</h3>
                            <div className="flex items-center gap-2 text-accent">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">{step.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                          {step.description}
                        </p>
                        
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Mobile Step Number */}
                  <div className={`lg:hidden flex justify-center ${index % 2 === 0 ? 'order-first' : 'order-last'}`}>
                    <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center shadow-elegant">
                      <span className="text-primary-foreground font-bold text-xl">{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-card/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              ¿Listo para empezar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Inicia tu consulta gratuita hoy mismo y da el primer paso hacia 
              tu empresa sin impuestos en Dubai.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => scrollToSection('contact')}
            >
              Iniciar Proceso Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;