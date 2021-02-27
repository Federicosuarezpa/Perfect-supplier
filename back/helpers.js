const { format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

const { ensureDir, unlink } = require("fs-extra");

const { UPLOADS_DIRECTORY } = process.env;

const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

sgMail.setApiKey(
  "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"
);

function generateRandomString(lenght) {
  return crypto.randomBytes(lenght).toString("hex");
}

/**Siguien la RFC 2822 standard email verification */
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
/**Comprobamos que tenga entre 8-30 de longitud y que tenga al menos una mayúscula, un dígito, una minúscula y un carácter especial */
function validatePass(pass) {
  let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;
  return passRegex.test(String(pass));
}
/**Comprobamos que el nombre solo tenga mayúsculas, minúsculas o dígitos */
function validateUserName(name) {
  const nameRegex = /^[a-zA-Z0-9\-]+$/;
  return nameRegex.test(String(name));
}

// Formatea un objeto de fecha a DATETIME de SQL

function formatDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

// Borra un fichero en el directorio de uploads
async function deletePhoto(photo) {
  const photoPath = path.join(uploadsDir, photo);

  await unlink(photoPath);
}

// Guarda una foto en el directorio de uploads
async function savePhoto(imageData) {
  // imageData es el objeto con información de la imagen

  // Asegurarse que el directorio de subida de imagenes exista
  await ensureDir(uploadsDir);

  // Leer la imagen con sharp
  const image = sharp(imageData.data);

  // Comprobar que la imagen no tenga un tamaño mayor a X pixeles de ancho
  /*const imageInfo = await image.metadata();

  // Si es mayor que ese tamaño redimensionarla a ese tamaño
  const IMAGE_MAX_WIDTH = 200;
  if (imageInfo.width > IMAGE_MAX_WIDTH) {
    image.resize(IMAGE_MAX_WIDTH);
  }
  */
  // Generar un nombre único para la imagen
  const savedImageName = `${uuid.v4()}.jpg`;

  // Guardar la imagen en el directorio de subida de imagenes
  await image.toFile(path.join(uploadsDir, savedImageName));
  console.log(uploadsDir);

  // Devolver en nombre del fichero
  return savedImageName;
}
async function sendMail({ to, subject, body }) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text: body,
      html: `
                <div>
                    <h1>${subject}<\h1>
                    <p>${body}<\p>
                <\div>
            `,
    };
    await sgMail.send(msg);
  } catch (error) {
    throw new Error("Error enviando el correo");
  }
}

module.exports = {
  formatDateToDB,
  savePhoto,
  deletePhoto,
  validatePass,
  validateUserName,
  validateEmail,
  generateRandomString,
  sendMail,
};
