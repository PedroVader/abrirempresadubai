import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle
} from "lucide-react";
// Añadir este import arriba con los demás
import { sendLeadToAirtable } from "@/lib/airtableService";

const Contact = () => {
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
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📋 Form submitted with data:', formData);
    
    if (!formData.name || !formData.email) {
      console.log('❌ Validation failed: missing required fields');
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios (nombre y email)",
        variant: "destructive",
      });
      return;
    }
  
    setIsLoading(true);
    console.log('🚀 Sending lead...');
  
    try {
      // Enviar a Supabase
      const { data, error } = await supabase.functions.invoke('send-lead-notification', {
        body: formData
      });
  
      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
  
      // Enviar a Airtable
      console.log('📊 Sending to Airtable...');
      await sendLeadToAirtable(formData);
      console.log('✅ Airtable: Lead saved');
  
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
      console.error('❌ Error sending lead:', error);
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Inicia tu
            <span className="bg-primary-gradient bg-clip-text text-transparent"> Consulta Gratuita</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nuestros expertos están listos para asesorarte sin compromiso. 
            Contacta con nosotros para recibir un plan personalizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="border-0 bg-card/50 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary-gradient rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground">Solicita tu Consulta</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 600 000 000"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa actual</Label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business">Tipo de negocio</Label>
                  <Input 
                    id="business" 
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="Describe tu actividad empresarial"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos más sobre tus necesidades y objetivos..."
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-4"
                  disabled={isLoading}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isLoading ? 'Enviando...' : 'Enviar Consulta'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Responderemos a tu consulta en menos de 24 horas
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Información de Contacto
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Estamos aquí para ayudarte en cada paso del proceso. 
                Contacta con nuestro equipo de expertos en Dubai.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 bg-card/30 hover:bg-card/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-gradient rounded-lg">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">Teléfono</div>
                      <div className="text-muted-foreground">Disponible por email</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/30 hover:bg-card/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-gradient rounded-lg">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">Email</div>
                      <div className="text-muted-foreground">info@abrirempresadubai.es</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/30 hover:bg-card/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-gradient rounded-lg">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground">Horario</div>
                      <div className="text-muted-foreground">Disponible 24/7</div>
                      <div className="text-muted-foreground">Soporte continuo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6">
              <h4 className="font-semibold text-foreground mb-2">
                ¿Necesitas ayuda urgente?
              </h4>
              <p className="text-muted-foreground">
                Nuestro equipo de soporte está disponible para consultas urgentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;