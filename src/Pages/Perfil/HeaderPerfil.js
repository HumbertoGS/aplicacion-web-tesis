export default function HeaderPerfil({ user, usuario }) {
  return (
    <div className="mt-4">
      <h5 className="text-center">Bienvenido {usuario.nombre}</h5>
      <hr />
    </div>
  );
}
