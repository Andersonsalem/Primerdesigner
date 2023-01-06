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

#reverse
def reverse(seq):
    return seq[::-1]

#needlemanwunsch
def matching(primer, motherseq):
    #length of primer
    lenprim = len(primer)
    #length of mother sequence
    lenmom = len(motherseq)

    matrix = np.zeros((lenprim+1,lenmom+1))
    
    opp_prim = opposite(primer)
    opp_prim = opposite(opp_prim)

    for i in range(lenprim):
        for j in range(lenmom):
            #matching case (+1)
            if opp_prim[i]==motherseq[j]:
                matrix[i+1][j+1]= max(matrix[i][j]+1,matrix[i+1][j]-1,matrix[i][j+1]-1)
            #mismatching case (-1)
            else:
                matrix[i+1][j+1]= max(matrix[i][j],matrix[i+1][j],matrix[i][j+1])-1

    
    
    return(matrix)

def matchingopt(primer,motherseq,matrix):
    shape = matrix.shape
    
    matrix = np.append(matrix,np.zeros((1,shape[1])),0)
    
    
     
    opp_prim = opposite(primer)
    
    for j in range(len(motherseq)):
        #matching case (+1)
        if opp_prim[-1]==motherseq[j]:
            matrix[shape[0]][j+1]= max(matrix[shape[0]-1][j]+1,matrix[shape[0]][j]-1,matrix[shape[0]-1][j+1]-1)
        #mismatching case (-1)
        else:
            matrix[shape[0]][j+1]= max(matrix[shape[0]-1][j],matrix[shape[0]][j],matrix[shape[0]-1][j+1])-1
    return matrix

'''
TODO
Implement metling temperature estimator
in other file, implement primer designer (half done)
'''










    
    