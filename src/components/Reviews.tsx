import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Carlos Mendoza",
      role: "CEO, Tech Solutions",
      rating: 5,
      review: "Proceso increíblemente eficiente. En 3 semanas tenía mi empresa operativa en Dubai con cuenta bancaria incluida. El equipo me guió en cada paso.",
      avatar: "CM",
      date: "Hace 2 semanas"
    },
    {
      name: "María González",
      role: "Consultora Digital",
      rating: 5,
      review: "La mejor decisión que tomé para mi negocio. El ahorro fiscal es real y el servicio profesional. Recomiendo 100% a cualquier empresario.",
      avatar: "MG",
      date: "Hace 1 mes"
    },
    {
      name: "Antonio Ruiz",
      role: "Inversor Inmobiliario",
      rating: 5,
      review: "Excelente asesoramiento desde el primer día. Me ayudaron a elegir la Free Zone perfecta para mi actividad y optimizar mi estructura fiscal.",
      avatar: "AR",
      date: "Hace 3 semanas"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-section-gradient border-b border-border/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-2xl font-bold text-foreground">4.9/5</span>
            <span className="text-muted-foreground">• +200 empresas creadas</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Lo que dicen nuestros clientes sobre nuestros servicios
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card 
              key={index} 
              className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-accent/30" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>
                
                {/* Review Text */}
                <p className="text-card-foreground leading-relaxed mb-6 text-sm">
                  "{review.review}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground text-sm">
                      {review.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {review.role}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {review.date}
                    </div>
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

export default Reviews;