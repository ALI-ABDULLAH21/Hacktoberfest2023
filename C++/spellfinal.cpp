

#include <iostream>
#include <fstream>
#include <string>
#include <unordered_map>
#include<algorithm>

using namespace std;

unordered_map<string, bool> dictionary;
void loadDictionary(fstream& file) {
    if (file.is_open()) {
        string word;
        while (file >> word) {
            
            transform(word.begin(), word.end(), word.begin(), ::tolower);
            dictionary[word] = true;
        }
    }
    else {
        cout << "Failed to open dictionary file." << endl;
    }
}



string correctSpelling(string word) {
    
    transform(word.begin(), word.end(), word.begin(), ::tolower);

    // If the word ends in -ies, remove the -ies and add -y
    if (word.length() >= 4 && word.substr(word.length() - 3) == "ies") {
        return word.substr(0, word.length() - 3) + "y";
    }

    // If the word ends in -es or -ed, remove the -s or -d
    else if (word.length() >= 3 && (word.substr(word.length() - 2) == "es" || word.substr(word.length() - 2) == "ed")) {
        return word.substr(0, word.length() - 2);
    }

    // If the word ends in -ing, remove the -ing and add -e
    else if (word.length() >= 5 && word.substr(word.length() - 4) == "ing") {
        return word.substr(0, word.length() - 3) + "e";
    }

    // If the word ends in -s, remove the -s
    else if (word.length() >= 2 && word[word.length() - 1] == 's') {
        return word.substr(0, word.length() - 1);
    }

    // If the word ends in -ly, remove the -ly
    else if (word.length() >= 3 && word.substr(word.length() - 2) == "ly") {
        return word.substr(0, word.length() - 2);
    }

    // If the word ends in -ing, remove the -ing
    else if (word.length() >= 4 && word.substr(word.length() - 3) == "ing") {
        return word.substr(0, word.length() - 3);
    }

    // Return the original word if none of the conditions are met
    return word;
}
void spellCheck(string inputFilename,string outputFilename) {
    ifstream inputFile(inputFilename);
    ofstream outputFile(outputFilename);
    if (inputFile.is_open() && outputFile.is_open()) {
        string line;
        while (getline(inputFile, line)) {
            string word;
            for (int i = 0; i < line.length(); i++) {
                if (isspace(line[i])) {
                    // Check if previous word is spelled correctly
                    if (dictionary.find(word) != dictionary.end()) {
                        outputFile << word << " ";
                    } else {
                        
                        string correctedWord = correctSpelling(word);
                        outputFile << correctedWord << " ";
                    }
                    word.clear();
                } else {
                    word += tolower(line[i]);
                }
            }
            // Check if last word is spelled correctly
            if (dictionary.find(word) != dictionary.end()) {
                outputFile << word << " ";
            } else {
            
                string correctedWord = correctSpelling(word);
                
                if (correctedWord != word) {
                    // Ask the user for the correct alternate
                    string input;
                    cout << "The word \"" << word << "\" is misspelled. ";
                    cout << "Did you mean \"" << correctedWord << "\"? (Y/N): ";
                    cin >> input;
                    while (input != "Y" && input != "N") {
                        cout << "Please enter Y or N: ";
                        cin >> input;
                    }
                    if (input == "Y") {
                        cout<<"Successfully wrote"<<" "<<correctedWord<<" "<<"In a file"<<endl;
                        outputFile << correctedWord << " ";
                        
                    
                    } else {
                        outputFile << word << " ";
                        cout<<"Successfully wrote"<<" "<<word<<" "<<"In a file"<<endl;
                    }
                }
            }
            outputFile << endl;
        }
    }
    else{
        cout<<"File is not responding."<<endl;
    }
    inputFile.close();
    outputFile.close();
}




int main() {

    
fstream dictionaryFile("dict.txt");
loadDictionary(dictionaryFile);
dictionaryFile.close();

    string inputFile = "input.txt";
    string outputFile = "output.txt";
    spellCheck(inputFile, outputFile);

    return 0;
}





