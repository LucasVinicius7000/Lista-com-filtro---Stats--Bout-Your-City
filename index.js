async function listarUFs() {
  var ufs = [];

  try {
    await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((response) => response.json())
      .then((response) => {
        response.forEach((element) => {
          ufs.push({
            id: element.id,
            nome: element.nome,
          });
        });
      });
  } catch (error) {
    console.log("Não foi possível listar as UFs.", error);
  } finally {
    return ufs;
  }
}

async function listarMunicipios(ufs) {
  var municipios = [];

  try {
    for (let uf of ufs) {
      await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.id}/municipios`
      )
        .then(async (response) => await response.json())
        .then((response) => {
          municipios = [...municipios, ...response];
        });
    }
  } catch (error) {
    console.log("Não foi possível listar os municípios", error);
  } finally {
    let m = [];
    municipios.forEach((element) => {
      m.push({
        id: element.id,
        nome: element.nome.toLowerCase(),
        upperNome: element.nome,
        UF: element.microrregiao.mesorregiao.UF.nome,
        sigla: element.microrregiao.mesorregiao.UF.sigla.toLowerCase(),
      });
    });
    return m;
  }
}

async function returnListaMunicipios() {
  var ufs = await listarUFs();
  var municipios = await listarMunicipios(ufs);
  return municipios;
}

async function searchCidadeByFiltro(e) {
  var m = await returnListaMunicipios();
  var cidadesFiltradas = [];
  cidadesFiltradas = m.filter((municipio) => {
    return municipio.nome.includes(e.target.value?.toLowerCase());
  });

  var municipios = document.getElementsByClassName("municipios")[0];
  var municipiosNode = [];

  cidadesFiltradas.map((municipio) => {
    // Tag li criada e estilizada
    var el = document.createElement("li");
    el.classList.add("item", "centralizaFlex");
    // Tag a criada e atribuída a um identificador
    var a = document.createElement("a");
    a.id = "aEl";
    let cityName = municipio.nome.replace(/ /gi, "-");
    a.setAttribute(
      "href",
      `https://cidades.ibge.gov.br/brasil/${municipio.sigla}/${cityName}/panorama`
    );
    a.setAttribute("target", "_blank");
    // Tag img criada com imagem setada
    var img = document.createElement("img");
    img.setAttribute("src", "./assets/double-arrow-icon.svg");
    // Adiciona imagem na tag a
    a.appendChild(img);
    // Tag recebe texto
    var txt = document.createElement("span");
    txt.innerText = `${municipio.upperNome}, município em ${municipio.UF}`;
    a.appendChild(txt);
    // Tag li recebe tag a
    el.appendChild(a);
    el.style.cursor = "pointer";
    // Tag hr é criada e atribuída a um identificador
    var hr = document.createElement("hr");
    hr.id = "hr";

    municipiosNode.push(el);
    municipiosNode.push(hr);
  });

  if (municipios.childElementCount > 0) {
    municipios.innerHTML = null;
    for (let node in municipiosNode) {
      municipios.appendChild(municipiosNode[node]);
    }
  } else {
    for (let node in municipiosNode) {
      municipios.appendChild(municipiosNode[node]);
    }
  }

  if (e.target.value == "" || e.target.value == undefined) {
    municipios.innerHTML = null;
    changeBackgroundFlag(undefined);
  } else {
    changeBackgroundFlag(cidadesFiltradas[0]);
  }
}

function changeBackgroundFlag(municipio) {
  debugger;
  var html = document.getElementsByTagName("html")[0];

  var codigoUF =
    municipio != undefined ? municipio.id.toString().slice(0,2) : undefined;

  switch (codigoUF) {
    case "11":
      html.style.backgroundImage = `url('./assets/rondonia-flag.png')`;
      break;
    case "12":
      html.style.backgroundImage = `url('./assets/acre-flag.png')`;
      break;

    case "13":
      html.style.backgroundImage = `url('./assets/amazonas-flag.png')`;
      break;

    case "14":
      html.style.backgroundImage = `url('./assets/roraima-flag.png')`;
      break;

    case "15":
      html.style.backgroundImage = `url('./assets/para-flag.png')`;
      break;

    case "16":
      html.style.backgroundImage = `url('./assets/amapa-flag.png')`;
      break;
    case "17":
      html.style.backgroundImage = `url('./assets/tocantins-flag.png')`;
      break;

    case "21":
      html.style.backgroundImage = `url('./assets/maranhao-flag.png')`;
      break;

    case "22":
      html.style.backgroundImage = `url('./assets/piaui-flag.png')`;
      break;
    case "23":
      html.style.backgroundImage = `url('./assets/ceara-flag.png')`;
      break;

    case "24":
      html.style.backgroundImage = `url('./assets/rio-grande-do-norte-flag.png')`;
      break;
    case "25":
      html.style.backgroundImage = `url('./assets/paraiba-flag.png')`;
      break;

    case "26":
      html.style.backgroundImage = `url('./assets/pernambuco-flag.png')`;
      break;

    case "27":
      html.style.backgroundImage = `url('./assets/alagoas-flag.png')`;
      break;
    case "28":
      html.style.backgroundImage = `url('./assets/sergipe.png')`;
      break;

    case "29":
      html.style.backgroundImage = `url('./assets/bahia-flag.png')`;
      break;

    case "31":
      html.style.backgroundImage = `url('./assets/minas-gerais-flag.png')`;
      break;
    case "32":
      html.style.backgroundImage = `url('./assets/espirito-santo-flag.png')`;
      break;

    case "33":
      html.style.backgroundImage = `url('./assets/rio-de-janeiro-flag.png')`;
      break;

    case "35":
      html.style.backgroundImage = `url('./assets/sao-paulo-flag.png')`;
      break;

    case "41":
      html.style.backgroundImage = `url('./assets/parana-flag.png')`;
      break;

    case "42":
      html.style.backgroundImage = `url('./assets/santa-catarina-flag.png')`;
      break;

    case "43":
      html.style.backgroundImage = `url('./assets/rio-grande-do-sul-flag.png')`;
      break;

    case "50":
      html.style.backgroundImage = `url('./assets/mato-grosso-do-sul-flag.png')`;
      break;

    case "51":
      html.style.backgroundImage = `url('./assets/mato-grosso-flag.png')`;
      break;

    case "52":
      html.style.backgroundImage = `url('./assets/goais-flag.png')`;
      break;

    case "53":
      html.style.backgroundImage = `url('./assets/distrito-federal-flag.png')`;
      break;

    case undefined:
      html.style.backgroundImage = "url(./assets/brazil-flag.jpg)";
      break;
  }
}

function hideList(e) {
  var d = document.getElementsByClassName("municipios")[0];
  d.innerHTML = "";
}

document.getElementsByTagName("body")[0].addEventListener("dblclick", () => {
  hideList();
});


