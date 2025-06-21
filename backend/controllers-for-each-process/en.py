from pypdf import PdfReader, PdfWriter
import sys


def encrypt(filepath, outpath):
    reader = PdfReader(filepath)
    writer = PdfWriter(outpath)
    writer.append_pages_from_reader(reader)
    writer.encrypt("password")

    with open(outpath, "wb") as out_file:
        writer.write(out_file)
    print("success")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("please provide PDF file input-path and output path ", file=sys.stderr)
        sys.exit(1)

    encrypt(sys.argv[1], sys.argv[2])
