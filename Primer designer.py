import sequencemanipulation as sm
import numpy as np

def primer(seq,inl):
    initialength = inl
    while True:
        

        #to parametrize
        maxallowedscore = int(initialength*0.7)

        prim = sm.opposite(seq[:initialength])

        out = sm.matching(prim,seq)

        values = np.transpose(np.nonzero(out>maxallowedscore))

        maxrange = values.shape
        for i in range(maxrange[0]):
            if values[i][1]>initialength-1:
                break

            if i == maxrange-1:
                return prim













if __name__ == "__main__":
    sequence = input("Please provide your Fasta sequence:\n")
    inlength = 15
    #primer(sequence)
    
    