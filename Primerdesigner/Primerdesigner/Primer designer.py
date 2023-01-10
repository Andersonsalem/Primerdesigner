import sequencemanipulation as sm
import numpy as np
from math import log

def read(init):
    if init[0]==">":
        arr = init.split('\n')
        out = ""
        name = arr
        for i in range(1,len(arr)):
            if (len(arr[i])>0):
                out+=arr[i]
        return (name,out,True)
    else:
        arr = init.split('\n')
        out =""
        for i in range(len(arr)):
            if (len(arr[i])>0):
                out+=arr[i]
        return("NoName",out,False)

#TODO redo all of it

def primer(seq:str,siz:int):
    H = {
        "AA":-9.1,
        "TT":-9.1,
        "AT":-8.6,
        "TA":-6.0,
        "CA":-5.8,
        "TG":-5.8,
        "GT":-6.5,
        "AC":-6.5,
        "CT":-7.8,
        "AG":-7.8,
        "GA":-5.6,
        "TC":-5.6,
        "CG":-11.9,
        "GC":-11.1,
        "GG":-11.0,
        "CC":-11.0,
    }
    S = {
        "AA":-0.0240,
        "TT":-0.0240,
        "AT":-0.0239,
        "TA":-0.0169,
        "CA":-0.0129,
        "TG":-0.0129,
        "GT":-0.0173,
        "AC":-0.0173,
        "CT":-0.0208,
        "AG":-0.0208,
        "GA":-0.0135,
        "TC":-0.0135,
        "CG":-0.0278,
        "GC":-0.0267,
        "GG":-0.0266,
        "CC":-0.0266,       
    }
    prim = seq[:siz]
    if siz == len(seq):
        siz = siz-1
    bigH = 0
    bigS = 0

    
    for i in range(siz-1):
        bigH += H[prim[i]+prim[i+1]]
        bigS += S[prim[i]+prim[i+1]]
    
    A = -0.0108
    R = 0.00199
    C = 0.0000005
    N = 0.05

    Tm = bigH/(A+bigS+R*log(C/4))-273.15+16.6*log(N,10)
    notgood = True
    
    while notgood:
        #Zimo's gotta comment on this one
        if Tm>55 and (prim[-1] =="C" or (prim[-1] =="G")) and not("AAA" in prim[-5:]) and not("TTT" in prim[-5:]) and not("GGG" in prim[-5:]) and not("CCC" in prim[-5:]):
            notgood = False
        else:
            siz +=1
            prim = prim + seq[siz]
            bigH+= H[prim[-2:]]
            bigS+= S[prim[-2:]]
            Tm = bigH/(A+bigS+R*log(C/4))-273.15+16.6*log(N,10)
    print(prim)
    print(Tm)
    return (prim, Tm)     



def GCcontent(primer):
    nbGC = 0
    length = len(primer)
    for i in range(length):
        if primer[i] in "GC":nbGC+=1 
    return(nbGC/length*100)

def validation(seq):
    length = len(seq)
    if (length%3 != 0) :
        raise ValueError("Sequence length is not a multiple of 3")

    if (seq[0:3] != "ATG"):
        raise ValueError("There is no start codon")
    
    if (seq[-3:]!= "TAA" and seq[-3:]!= "TAG" and seq[-3:]!= "TGA"):
        raise ValueError("There is no stop codon")


def reverseprimer(seq:str,siz:int):
    newseq = sm.reverse(seq)
    newseq = sm.opposite(newseq)
    prim = primer(newseq,siz)
    return sm.reverse(prim)







if __name__ == "__main__":
    sequence = "ATGTCTATCCCAGAAACTCAAAAAGGTGTTATCTTCTACGAATCCCACGGTAAGTTGGAATACAAAGATATTCCAGTTCCAAAGCCAAAGGCCAACGAATTGTTGATCAACGTTAAATACTCTGGTGTCTGTCACACTGACTTGCACGCTTGGCACGGTGACTGGCCATTGCCAGTTAAGCTACCATTAGTCGGTGGTCACGAAGGTGCCGGTGTCGTTGTCGGCATGGGTGAAAACGTTAAGGGCTGGAAGATCGGTGACTACGCCGGTATCAAATGGTTGAACGGTTCTTGTATGGCCTGTGAATACTGTGAATTGGGTAACGAATCCAACTGTCCTCACGCTGACTTGTCTGGTTACACCCACGACGGTTCTTTCCAACAATACGCTACCGCTGACGCTGTTCAAGCCGCTCACATTCCTCAAGGTACCGACTTGGCCCAAGTCGCCCCCATCTTGTGTGCTGGTATCACCGTCTACAAGGCTTTGAAGTCTGCTAACTTGATGGCCGGTCACTGGGTTGCTATCTCCGGTGCTGCTGGTGGTCTAGGTTCTTTGGCTGTTCAATACGCCAAGGCTATGGGTTACAGAGTCTTGGGTATTGACGGTGGTGAAGGTAAGGAAGAATTATTCAGATCCATCGGTGGTGAAGTCTTCATTGACTTCACTAAGGAAAAGGACATTGTCGGTGCTGTTCTAAAGGCCACTGACGGTGGTGCTCACGGTGTCATCAACGTTTCCGTTTCCGAAGCCGCTATTGAAGCTTCTACCAGATACGTTAGAGCTAACGGTACCACCGTTTTGGTCGGTATGCCAGCTGGTGCCAAGTGTTGTTCTGATGTCTTCAACCAAGTCGTCAAGTCCATCTCTATTGTTGGTTCTTACGTCGGTAACAGAGCTGACACCAGAGAAGCTTTGGACTTCTTCGCCAGAGGTTTGGTCAAGTCTCCAATCAAGGTTGTCGGCTTGTCTACCTTGCCAGAAATTTACGAAAAGATGGAAAAGGGTCAAATCGTTGGTAGATACGTTGTTGACACTTCTAAATAA"
    l = 15


    #validation(sequence)

    #x = read(sequence)
    #primer(sequence,l)

    x= "A "
    y= "sentence"
    z = x+y
    print(z)
    