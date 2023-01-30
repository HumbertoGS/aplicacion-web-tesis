export default function HeaderPerfil({ user }) {
  return (
    <div className="mt-4">
      <h5 className="text-center">Bienvenido {user?.nombre}</h5>
      <hr />
    </div>
  );
}
