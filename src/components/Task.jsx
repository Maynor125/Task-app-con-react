import PropTypes from 'prop-types';




const Task = ({ task, onDelete, onUpdate, onComplete }) => {
  //Logica funcional
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleComplete = () => {
    onComplete(task);
  };

  const handleEdit = () => {
    onUpdate(task);
  };

  return (
    <div className="task">
      <div className="cabecera">
             <div className="container-img">
        <img src="../../public/images/task.png" alt="Icono ilustrativo" />
      </div>
      <p className="fechaa">
        {task.fechaCreacion}
      </p>
      </div>
 
      <h4 className="title">{task.titulo}</h4>
      <p className="descripcion">
       {task.descripcion}
      </p>
      <div className="botones">
        <button onClick={handleEdit}>
          Editar
          </button>
          <button onClick={handleDelete}>
          Eliminar
          </button>
          <button className={task.estado === "Completa" ? 'completa' :''} disabled={task.estado === "Completa"} onClick={handleComplete}>
          {task.estado === "Completa" ? 'Completada' : 'Completar'}
          </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    fechaCreacion: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Task;
