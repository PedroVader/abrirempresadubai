import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
// Importamos el servicio de Airtable en lugar de Supabase
import { sendLeadToAirtable } from "@/lib/airtableService";
import { useState } from "react";
import { ArrowRight, Building2, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";

const Hero = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    business: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios (nombre y email)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Modificación: Llamada directa al servicio de Airtable
      await sendLeadToAirtable(formData);

      toast({
        title: "¡Consulta enviada!",
        description: "Hemos recibido tu consulta. Te contactaremos en menos de 24 horas.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        business: '',
        message: ''
      });

    } catch (error: any) {
      console.error("Error al enviar formulario:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu consulta. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Dubai skyline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 items-center xl:items-start">
            {/* Left Content */}
            <div className="flex-1 xl:max-w-3xl flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
                Abre tu Empresa en Dubai. 
                <span className="bg-accent-gradient bg-clip-text text-transparent block sm:inline">Emigra de forma legal</span> sin que te cause problemas con hacienda.
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
                Aprovecha las ventajas fiscales de Dubai y establece tu negocio en una de las 
                economías más dinámicas del mundo. Proceso 100% legal y garantizado.
              </p>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="flex items-start gap-4 text-primary-foreground/90">
                  <div className="p-3 bg-accent/20 rounded-xl shrink-0">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">0% Impuestos</div>
                    <div className="text-sm opacity-80">Sobre beneficios corporativos</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-primary-foreground/90">
                  <div className="p-3 bg-accent/20 rounded-xl shrink-0">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">100% Legal</div>
                    <div className="text-sm opacity-80">Cumplimiento total</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-primary-foreground/90">
                  <div className="p-3 bg-accent/20 rounded-xl shrink-0">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">Setup Rápido</div>
                    <div className="text-sm opacity-80">En menos de 10 días</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full xl:w-[480px] xl:shrink-0 mt-8 xl:mt-0">
              <div className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-primary-foreground/20 shadow-2xl">
                <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-8">
                  Consulta Gratuita en Español
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      type="text" 
                      name="name"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      name="phone"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Input 
                      type="text" 
                      name="company"
                      placeholder="Empresa actual"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Input 
                      type="text" 
                      name="business"
                      placeholder="Tipo de negocio"
                      value={formData.business}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      placeholder="Cuéntanos sobre tus necesidades y objetivos..."
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 text-base rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-accent-gradient text-accent-foreground font-semibold py-4 px-6 text-base rounded-xl hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Enviando...' : 'Solicitar Consulta'}
                    {!isLoading && <ArrowRight className="h-5 w-5" />}
                  </button>
                </form>
                
                <p className="text-primary-foreground/60 text-sm mt-6 text-center">
                  Sin compromiso • Respuesta en 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;