import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ proyectos, onEditarProyecto, onEliminarProyecto }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {proyectos.map((proyecto) => (
        <ProjectCard
          key={proyecto.id}
          proyecto={proyecto}
          onEditar={() => onEditarProyecto(proyecto)}
          onEliminar={() => onEliminarProyecto(proyecto.id)}
        />
      ))}
    </div>
  );
};

export default ProjectList;
