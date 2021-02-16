import { useForm } from 'react-hook-form';

export default function AuthForm(props) {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {};
  return (
    <div class="square">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <label htmlFor="mensaje">Mensaje</label>
        <textarea htmlFor="textarea" rows="10" cols="40"></textarea>
        <input className="boton" type="submit" />
      </form>
    </div>
  );
}
