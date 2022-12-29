import numpy as np #might have to use it idk
#Opposite
def opposite(seq):
    output = ""

    matches = {
        "A":"T",
        "T":"A",
        "C":"G",
        "G":"C"
    }
    for i in seq:
        output += matches[i]
    
    return output

#needlemanwunsch
def matching(primer, motherseq):
    #length of primer
    lenprim = len(primer)
    #length of mother sequence
    lenmom = len(motherseq)

    matrix = np.zeros((lenprim+1,lenmom+1))
    
    opp_prim = opposite(primer)

    for i in range(lenprim):
        for j in range(lenmom):
            #matching case (+1)
            if opp_prim[i]==motherseq[j]:
                matrix[i+1][j+1]= max(matrix[i][j]+1,matrix[i+1][j]+1,matrix[i][j+1]+1)
            #mismatching case (-1)
            else:
                matrix[i+1][j+1]= max(matrix[i][j]-1,matrix[i+1][j]-1,matrix[i][j+1]-1)

    
    
    return(matrix)
'''
TODO Implement detector of matches within the matrix output of needleman wunsch
Implement metling temperature estimator

in other file, implement primer designer
'''


#test area 
out = matching("ACTG","ACTGAC")
print(out)


    
    