// a fabri le cabe el chori

// ----> comentarios de clientes (va rotando solo)
const comentarios = [
    { texto: "Llegó todo perfecto y antes de lo esperado. WAAAGH garantizado.", autor: "- Gorbag, Waaagh! de los Deathskulls" },
    { texto: "La pinturaz de la miniatura tenía un detalle increíble, superó lo que esperaba.", autor: "- Uzgob el Coleccionista" },
    { texto: "Excelente atención, me ayudaron a elegir el codex justo para mi ejército.", autor: "- Grukk, Capitán de los Bad Moons" },
    { texto: "Compré una figura de regalo y llegó impecable, muy recomendable la tienda.", autor: "- Mara, cliente frecuente" },
    { texto: "wagh wa wa wa waaaagh wagh wagh, waaaaagh wa...wa, WAAAAGH!.", autor: "- Waagh el orko manija" },
    { texto: "Re cajetilla la pagina chabon.", autor: "- Nico el loco falopa" },
    { texto: "trazyn sos mi idolo, me encanta esa habilidad para evadir laburo que tenes.", autor: "- Illuminor Szeras" }, //el maxi me dio libertad creativa, asi que la use
    { texto: "Skibidi Sigma Pomni Digital Fortnite ChambaFree Gigachad Rizz Ohmygodfloo XXXTentacionHotmail Lionel Ronaldo Junior Mewing TerceroChiki Ibai Xocas Ete Sech Golden Toy PuppetOhio Rubén Tuesta YouTubeproinsanoGlobodetexto51 Decadencia777", autor: "- :D caine " },
    { texto: "Aguante Creedense clearwater revival forever.", autor: "- el deivid, machoAlfa.com" },
    { texto: "Morko se parece a mi tio.", autor: "- La chiki" },

];

const tarjetaComentario = document.querySelector(".comentario-destacado .comentario-card");

let indiceComentario = 0;

function actualizarComentario() {
    if (!tarjetaComentario) return;

    const comentario = comentarios[indiceComentario];

    tarjetaComentario.classList.add("cambiando");

    setTimeout(() => {
        tarjetaComentario.querySelector(".comentario-texto").textContent = `"${comentario.texto}"`;
        tarjetaComentario.querySelector(".comentario-autor").textContent = comentario.autor;
        tarjetaComentario.classList.remove("cambiando");
    }, 300);

    indiceComentario = (indiceComentario + 1) % comentarios.length;
}

actualizarComentario();
setInterval(actualizarComentario, 4500);