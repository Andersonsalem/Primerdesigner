let option_num = 0;
let download_doc ="";
let bigbox = [];

window.onload = function () {
    showTab(1);
    option_num = 0;
    bigbox =[];
}

function download_plasmide () {
    //ecrit la fonction ici puis dans le array bigbox y'a la liste
    //des seq avec en premier la seq normal puis juste apres la reverse
    //si tu veux creer des constantes met les tops de la page et assure toi qu'elles sont pas modifiees dans le code
}

function download_all () {
    var data = new Blob([download_doc], { type: 'text/plain' });
    var downloadUrl = URL.createObjectURL(data);
    var a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "seq.fasta";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
    }, 0);
}

function submitc3() {
    let names = checkFieldsName();
    let tablefill = [];
    if (names.length !== 0 && option_num !== 0) {
        tablefill = getdatafortable(names);
    }
    else {
        var txt = document.getElementById("hidden-txt-name-c3");
        txt.style.display = "block";
        return;
    }
    tablefill = formatTable(tablefill);
    createTable(tablefill);
    var buttondownload = document.getElementById("button-c2-hidden");
    buttondownload.style.display = "block";
    var buttondownload2 = document.getElementById("button-c2-hidden2");
    buttondownload2.style.display = "block";
}

function formatTable(tablefill){
    let maxLength = 0;
    for (let i = 0; i < tablefill.length; i++) {
      maxLength = Math.max(maxLength, tablefill[i].length);
    }
  
    for (let i = 0; i < tablefill.length; i++) {
      while (tablefill[i].length < maxLength) {
        tablefill[i].push("");
      }
    }
    return tablefill;
}

function createTable(tablefill) {
    console.log(`tablefill is ${tablefill}`);
    var table = document.getElementById("myTable");
    table.style.display = "block";
    for (var i = 0; i < tablefill.length; i++) {
      var row = table.insertRow();
      for (var j = 0; j < tablefill[i].length; j++) {
        var cell = row.insertCell();
          cell.innerHTML = tablefill[i][j];
        }
      }
    }


function getdatafortable(name)
{
    let list_call = [];
    let added = [];
    let full = [['name', 'r/f','seq', 'length', 'tm', 'gc']];
    for(let i = 0; i < name.length; i++)
    {
        if(i%2 === 1){
            // list_call.push(name[i]);
            bigbox.push(name[i]);
            bigbox.push(reverse(name[i]));
            added = primer(name[i], 15);
            download_doc += `${added[0]}\n`;
            console.log("added is: ");
            console.log(added); 
            for(let w = 0; w < added.length; w++)
            {
                list_call.push(added[w]);
            }
            full.push(list_call);
            list_call = [''];
            list_call.push(`${name[i-1]}-r`);
            download_doc += `>${name[i-1]}-r\n`;
            // list_call.push(reverse(name[i]));
            added = reverseprimer(name[i], 15);
            download_doc += `${added[0]}\n`;
            for(let t = 0; t < added.length; t++)
            {
                list_call.push(added[t]);
            }
            full.push(list_call);
            list_call = [];
        }
        else{
            list_call.push(name[i]);
            list_call.push(`${name[i]}-f`);
            download_doc += `>${name[i]}-f\n`;
        }
    }
    return full;
}

// var name = document.getElementById("extra-info").value;
// var arn = document.getElementById("input-c2-arn").value;

function checkFieldsName() {
    let name = undefined;
    let arn = undefined;
    let n =0;
    let namelistarn = [];   
    for (let i = 0; i < option_num; i++) {
        n = i + 1;
        name = document.getElementById(`extra-info-c3${n}`).value;
        arn = document.getElementById(`input-c3${n}-arn`).value;
        if ((name === undefined || name === '')&& arn.charAt(0) === '>') {
            name = arn.split('\n')[0];
            name = name.substring(1);
            arn = arn.split('\n')[1];
            var txt = document.getElementById("hidden-txt-name");
            txt.style.display = "none";
            
        }
        else if ((name === undefined || name === '')&& arn.charAt(0) !== '>') {
            var txt = document.getElementById("hidden-txt-name");
            txt.style.display = "block";
            return [];
        }
        
        if(arn.charAt(0) ==='>'){
            arn = arn.split('\n')[1];
        }
        namelistarn.push(name);
        namelistarn.push(arn);
    }
    return namelistarn;
}

function showOptions() {

    let selectedOption = parseInt(document.getElementById("nombre-field").value);
    let options = document.getElementsByClassName("hidden-field");
    option_num = selectedOption;
    for (let i = 0; i < selectedOption; i++) {
        options[i].style.display = "block";
    }
    for (let h = selectedOption; h < options.length; h++) {
        options[h].style.display = "none";
    }

}

function tryfunction() {
    var name = document.getElementById("extra-info").value;
    var arn = document.getElementById("input-c2-arn").value;
    if (name === undefined && arn.charAt(0) === '>') {
        name = arn.split('\n')[0];
        name = name.substring(1);
        arn = arn.split('\n')[1];
        var txt = document.getElementById("hidden-txt-name");
        txt.style.display = "none";
    }
    else if (name === undefined && arn.charAt(0) !== '>') {
        var txt = document.getElementById("hidden-txt-name");
        txt.style.display = "block";
        return;
    }

    if (arn === '') {
        var txt = document.getElementById("hidden-txt-arn");
        txt.style.display = "block";
        return;
    }
    else {
        //faire l'appelle de la fonction ici
    }
}

function showTab(tabIndex) {
    const contents = document.getElementsByClassName("tab-content")[0].children;
    for (let i = 0; i < contents.length; i++) {
        if (i === tabIndex - 1) {
            contents[i].style.display = "block";
        } else {
            contents[i].style.display = "none";
        }
    }
}


function opposite(seq) {
    let output = "";

    let matches = {
        "A": "T",
        "T": "A",
        "C": "G",
        "G": "C"
    };
    for (let i of seq) {
        output += matches[i];
    }

    return output;
}

function reverse(seq) {
    return seq.split('').reverse().join('');
}

function GCcontent(primer) {
    let nbGC = 0;
    let length = primer.length;
    for (let i = 0; i < length; i++) {
        if (primer[i] === "G" || primer[i] === "C") {
            nbGC++;
        }
    }
    return nbGC / length * 100;
}


function primer(seq, siz) {
    const H = {
        "AA": -9.1,
        "TT": -9.1,
        "AT": -8.6,
        "TA": -6.0,
        "CA": -5.8,
        "TG": -5.8,
        "GT": -6.5,
        "AC": -6.5,
        "CT": -7.8,
        "AG": -7.8,
        "GA": -5.6,
        "TC": -5.6,
        "CG": -11.9,
        "GC": -11.1,
        "GG": -11.0,
        "CC": -11.0,
    };
    const S = {
        "AA": -0.0240,
        "TT": -0.0240,
        "AT": -0.0239,
        "TA": -0.0169,
        "CA": -0.0129,
        "TG": -0.0129,
        "GT": -0.0173,
        "AC": -0.0173,
        "CT": -0.0208,
        "AG": -0.0208,
        "GA": -0.0135,
        "TC": -0.0135,
        "CG": -0.0278,
        "GC": -0.0267,
        "GG": -0.0266,
        "CC": -0.0266,
    };
    let prim = seq.substring(0, siz);
    if (siz === seq.length) {
        siz = siz - 1;
    }
    let bigH = 0;
    let bigS = 0;

    for (let i = 0; i < siz - 1; i++) {
        bigH += H[prim[i] + prim[i + 1]];
        bigS += S[prim[i] + prim[i + 1]];
    }

    const A = -0.0108;
    const R = 0.00199;
    const C = 0.0000005;
    const N = 0.05;

    let Tm = bigH / (A + bigS + R * Math.log(C / 4)) - 273.15 + 16.6 * Math.log10(N);
    let notgood = true;

    while (notgood) {
        //Zimo's gotta comment on this one
        let GC = GCcontent(prim);
        let keep = (GC >= 30 && GC <= 70);
        if (Tm > 55 && (prim[prim.length - 1] === "C" || (prim[prim.length - 1] === "G")) && !prim.slice(-5).includes("AAA") && !prim.slice(-5).includes("TTT") && !prim.slice(-5).includes("GGG") && !prim.slice(-5).includes("CCC") && keep) {
            notgood = false;
        } else {
            siz += 1;
            prim = prim + seq[siz];
            bigH += H[prim.slice(-2)];
            bigS += S[prim.slice(-2)];
            Tm = bigH / (A + bigS + R * Math.log(C / 4)) - 273.15 + 16.6 * Math.log10(N);
        }
        if (siz >= 90 || (siz === seq.length)){
            return ["No adequate primer found"]
        }
    }
    console.log(prim);
    console.log(Tm);
    return [prim, prim.length, Tm, GCcontent(prim)];
}

function reverseprimer(seq, siz) {
    let newseq = reverse(seq);
    newseq = opposite(newseq);
    let prim = primer(newseq, siz);
    prim[0] = reverse(prim[0]);
    return prim;
}

function toggleInput() {
    var input = document.getElementById("extra-info");
    input.disabled = !input.disabled;
}

function toggleInput1() {
    var input = document.getElementById("extra-info-c31");
    input.disabled = !input.disabled;
}

function toggleInput2() {
    var input = document.getElementById("extra-info-c32");
    input.disabled = !input.disabled;
}

function toggleInput3() {
    var input = document.getElementById("extra-info-c33");
    input.disabled = !input.disabled;
}


function toggleInput4() {
    var input = document.getElementById("extra-info-c34");
    input.disabled = !input.disabled;
}

function toggleInput5() {
    var input = document.getElementById("extra-info-c35");
    input.disabled = !input.disabled;
}


function toggleInput6() {
    var input = document.getElementById("extra-info-c36");
    input.disabled = !input.disabled;
}

function toggleInput7() {
    var input = document.getElementById("extra-info-c37");
    input.disabled = !input.disabled;
}

function toggleInput8() {
    var input = document.getElementById("extra-info-c38");
    input.disabled = !input.disabled;
}
