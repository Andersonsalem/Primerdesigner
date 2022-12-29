import warnings



def read(seq):
    if not isinstance(seq,str):
        raise Exception("Invalid input")
    if seq[0] == ">":
        seq = seq[1:]
    print(seq)
    


def primer(seq):
    return






if __name__ == "__main__":
    sequence = input("Please provide your Fasta sequence:\n")
    #primer(sequence)
    
    read(sequence)