import sys
from pdf2docx import Converter
import os

def convert(filepath, outputpath):
    try:
        cv = Converter(filepath)
        cv.convert(outputpath, start=0, end=None)
        cv.close()
        print("Conversion successful")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
        
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("please provide PDF file input-path and output path ", file=sys.stderr)
        sys.exit(1)

    convert(sys.argv[1], sys.argv[2])