// src/lib/airtableService.ts

interface LeadData {
    name: string;
    email: string;
    phone: string;
    company: string;
    business: string;
    message: string;
  }
  
  export const sendLeadToAirtable = async (data: LeadData) => {
    const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
    const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
  
    if (!apiKey || !baseId || !tableName) {
      console.error("Faltan variables de entorno:", { apiKey: !!apiKey, baseId: !!baseId, tableName: !!tableName });
      throw new Error("Configuración de Airtable incompleta");
    }
  
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  
    // Mapeo exacto según tu captura de pantalla:
    // Formulario (izq) -> Airtable Columnas (der)
    const payload = {
      records: [
        {
          fields: {
            "Name": data.name,           // Coincide
            "Email": data.email,         // Coincide
            "Phone": data.phone,         // Coincide
            "Company Name": data.company,// CAMBIO: En tu tabla es "Company Name"
            "Business Type": data.business,// CAMBIO: En tu tabla es "Business Type"
            "Notes": data.message        // CAMBIO: En tu tabla es "Notes"
          }
        }
      ]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error respuesta Airtable:", errorData);
        throw new Error(errorData.error?.message || 'Error al guardar en Airtable');
      }
  
      return await response.json();
      
    } catch (error) {
      console.error("Error de conexión:", error);
      throw error;
    }
  };