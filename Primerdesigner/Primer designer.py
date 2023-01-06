import sequencemanipulation as sm
import numpy as np

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

#TODO make sure that primers don't match last 5 bases
def primer(seq,inl):
    initialength = inl
    
    #to parametrize
    maxallowedscore = int(initialength*0.4)

    prim = sm.opposite(seq[:initialength])

    out = sm.matching(prim,seq)
    values = np.transpose(np.nonzero(out>=maxallowedscore))

    maxrange = values.shape

    print(out)
    print(values)
    return (sm.opposite(prim))
    '''
    for i in range(maxrange[0]):
        if values[i][1]>initialength-1:
            break

        if i == maxrange[0]-1:
            return prim    
    initialength +=1
    while True:
        

        #to parametrize
        maxallowedscore = int(initialength*1)

        prim = sm.opposite(seq[:initialength])

        out = sm.matchingopt(prim,seq,out)

        values = np.transpose(np.nonzero(out>=maxallowedscore))

        maxrange = values.shape
        for i in range(maxrange[0]):
            if values[i][1]>initialength-1:
                break

            if i == maxrange[0]-1:
                return prim
        
        initialength +=1
        '''

def Tmestim(primer):
    pass

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










if __name__ == "__main__":
    sequence = input("Please provide your Fasta sequence:\n")
    inlength = 15


    validation(sequence)

    x = read(sequence)
    print(primer(sequence,inlength))
    #primer(sequence)
    
    