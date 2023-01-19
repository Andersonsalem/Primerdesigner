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
    }
console.log(prim);
console.log(Tm);
return [prim, prim.length, Tm, GC];
}

function reverseprimer(seq,siz) {
    let newseq = reverse(seq);
    newseq = opposite(newseq);
    let prim = primer(newseq,siz);
    return reverse(prim);
}
