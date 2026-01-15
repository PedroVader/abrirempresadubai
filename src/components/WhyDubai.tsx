import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  MapPin, 
  Users, 
  Banknote, 
  Plane, 
  Building,
  CheckCircle 
} from "lucide-react";
import businessMeeting from "@/assets/business-meeting.jpg";

const WhyDubai = () => {
  const benefits = [
    {
      icon: Banknote,
      title: "0% Impuesto sobre Beneficios",
      description: "Empresas en Free Zones no pagan impuestos corporativos durante los primeros 50 años."
    },
    {
      icon: MapPin,
      title: "Ubicación Estratégica",
      description: "Acceso directo a 2.5 mil millones de consumidores en Europa, Asia y África."
    },
    {
      icon: Users,
      title: "Talento Internacional",
      description: "Fuerza laboral multicultural y altamente cualificada de más de 200 nacionalidades."
    },
    {
      icon: Building,
      title: "Infraestructura Mundial",
      description: "Puertos, aeropuertos y telecomunicaciones de clase mundial."
    },
    {
      icon: Plane,
      title: "Conectividad Global",
      description: "Hub de conexión a más de 260 destinos internacionales."
    },
    {
      icon: TrendingUp,
      title: "Economía Estable",
      description: "Crecimiento económico sostenido y políticas gubernamentales favorables al negocio."
    }
  ];

  const stats = [
    { number: "0%", label: "Impuesto Corporativo", highlight: true },
    { number: "50+", label: "Free Zones Disponibles" },
    { number: "200+", label: "Nacionalidades" },
    { number: "100%", label: "Propiedad Extranjera" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Por qué elegir
              <span className="bg-primary-gradient bg-clip-text text-transparent"> Dubai</span>
              <span className="text-foreground"> para tu empresa?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Dubai se ha consolidado como el centro de negocios del Medio Oriente, 
              ofreciendo ventajas fiscales únicas y un entorno empresarial excepcional.
            </p>
            
            <div className="space-y-4">
              {[
                "Entorno libre de impuestos corporativos",
                "Proceso de setup empresarial simplificado",
                "Acceso a mercados emergentes clave",
                "Estabilidad política y económica",
                "Infraestructura tecnológica avanzada"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={businessMeeting} 
              alt="Business meeting in Dubai" 
              className="rounded-2xl shadow-elegant w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary-gradient p-6 rounded-xl shadow-glow">
              <div className="text-primary-foreground">
                <div className="text-3xl font-bold">0%</div>
                <div className="text-sm opacity-90">Impuestos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl ${
                stat.highlight 
                  ? 'bg-primary-gradient text-primary-foreground shadow-elegant' 
                  : 'bg-card/50 border border-border'
              }`}
            >
              <div className={`text-4xl font-bold mb-2 ${
                stat.highlight ? 'text-primary-foreground' : 'text-primary'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm ${
                stat.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 bg-card/50 hover:bg-card transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDubai;