#Project: Poznamky
#File: run.py
#Brief: Wrapper for server runner
#
#Authors:
#Rostislav Navratil (xnavra72)

from webapp import app

if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port="21212")
