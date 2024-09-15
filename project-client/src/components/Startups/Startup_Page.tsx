import uber from "../../assets/home/uber1.svg";
import React, { useEffect, useState } from "react";

function Startup_Page({ startupId }: { startupId: number }) {
  const [startupData, setStartupData] = useState<any>(null); // Estado para almacenar los datos del startup
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await fetch(`https://hack-project.onrender.com/startups/${startupId}`); // Cambia la URL a la de tu API
      const data = await response.json();
      setStartupData(data); // Guardar los datos obtenidos en el estado
      setLoading(false); // Finaliza el estado de carga
    } catch (error) {
      console.error("Error al obtener los datos de la API", error);
      setLoading(false); // Manejar cualquier error
    }
  };

  useEffect(() => {
    fetchData(); // Llamada a la API al montar el componente
  }, [startupId]); // Ejecutar la llamada cada vez que cambie el ID del startup

  if (loading) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  if (!startupData) {
    return <div>Error al cargar los datos</div>; // Manejo básico de error si no hay datos
  }

  return (
    <div className="w-full pt-[100px] flex flex-col justify-end items-start px-10 mb-[250px]">
      {/* Sección del uber */}

      {/* Franja negra con solo el título */}
      <div className="w-full py-5 flex items-center justify-center">
        <div className="w-full p-10 flex justify-center items-center">
          <img src={startupData.link_logo} alt="Company uber" className="w-100 h-20" />
        </div>
      </div>

      {/* Texto de misión fuera de la franja negra */}
      <div className="w-full py-5 flex items-center justify-center">
        <div className="w-[80%] text-white text-center">
        <p className="mt-2 text-2xl mb-5">
            <strong>Name:</strong> {startupData.name}
          </p>
          <p className="mt-2 text-2xl mb-5">
            <strong>Description:</strong> {startupData.description}
          </p>
          <p className="mt-2 text-2xl mb-5">
            <strong>Mission:</strong> {startupData.research_develop}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Startup_Page;