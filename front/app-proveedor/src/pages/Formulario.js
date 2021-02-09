function formulario(){
    return (
    <>

    <h1>Contacto</h1>
      <div className="formulario">

   
      <div className="user">
    <label htmlFor="user">Nombre </label>
    <input name="user" />

      </div>
    <div className="email">
    <label htmlFor="email"> Email   </label>
    <input name="email" />

    </div>

    
      </div>  
        <div className="comentarios">

    <label htmlfor="coments">Comentarios</label>
    <textarea htmlFor="textarea"rows="10" cols="40"> </textarea>
    
        </div>
    <div className="submit">
    <input type="submit"></input>

    </div>


    </>
    );
 }

export default formulario;


