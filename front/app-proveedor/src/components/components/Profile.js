import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import profile from '../../svg/profile-user.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import { getUserInfo } from '../../http/api2';
import { Rating } from '@material-ui/lab';
export default function Profile(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [value, setValue] = useState();
  const [disabled, setDisabled] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const { userData } = useAuth();
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onDelete = async () => {};
  useEffect(() => {
    getUserInfo(userData?.id).then((data) => {
      setProfileData(data);
    });
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSubmit = async (data) => {
    try {
      const serverResponse = await props.onSubmit(data);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.status === 200) {
        setstatusMessage('');
        setErrorMessage('');
        setstatusMessage('Información actualizada con exito');
      }
      if (serverResponse.status !== 200) {
        setErrorMessage('Ha habido un error, es posible que falten campos');
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage('');
      setErrorMessage('error');
    }
  };

  return (
    <div className="backgroundProfile">
      <div className="recuadroProfile">
        <div className="panel">
          <Link>
            <p className="selected opcion">Información personal</p>
          </Link>
          <Link to={`/profile/${userData?.id}/newProduct`}>
            <p className="opcion">Añadir Producto</p>
          </Link>
          <Link to={`/profile/${userData?.id}/buy`}>
            <p className="opcion">Compras realizadas</p>
          </Link>

          <Link to={`/profile/${userData?.id}/all`}>
            <p className="opcion">Productos publicados</p>
          </Link>
        </div>
        <div className="infoPanel">
          <div className="dropdown alineado">
            <p className=" op2">☰</p>
            <div className="dropdown-content">
              <Link to={`/profile/${userData?.id}`}>Información personal</Link>
              <Link to={`/profile/${userData?.id}/newProduct`}>Añadir Producto</Link>
              <Link to={`/profile/${userData?.id}/buy`}>Compras realizadas</Link>
              <Link Link to={`/profile/${userData?.id}/all`}>
                Productos publicados
              </Link>
            </div>
          </div>
          <div className="infoUser">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Información Personal</h1>
              <div className="parent">
                {!profileData?.data?.photo && !selectedFile && (
                  <img src={profile} className="image1" alt="website logo" />
                )}
                {!selectedFile && profileData?.data?.photo && (
                  <img
                    src={`http://localhost:3000/uploads/${String.fromCharCode.apply(
                      null,
                      profileData?.data?.photo?.data
                    )}`}
                    alt=""
                    className="image1"
                  ></img>
                )}
                {selectedFile && <img src={preview} alt="" className="image1"></img>}
                <label className="textEdit">
                  <input
                    className="image1"
                    type="file"
                    name="foto"
                    id="foto"
                    ref={register()}
                    onChange={onSelectFile}
                  />
                  Editar
                </label>
              </div>
              <label className="nameUser" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Introduzca el nombre"
                defaultValue={profileData?.data?.name}
                ref={register({ required: true })}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                defaultValue={profileData?.data?.email}
                placeholder="Introduzca el email"
                ref={register({ required: true })}
              />
              <label htmlFor="bio">Bio</label>
              <textarea
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="bio"
                defaultValue={profileData?.data?.bio}
                name="bio"
                placeholder="Escriba un comentario..."
                ref={register()}
              ></textarea>
              <input className="botonLogin" type="submit" value="Actualizar Información" />
              <hr></hr>
              <h4 className="registrado" onClick={onDelete}>
                Borrar cuenta
              </h4>
              <Rating
                name="half-rating-read"
                defaultValue={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                readOnly={disabled}
              />
              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
