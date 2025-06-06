from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

if __name__ == '__main__':
    text = extract_text_from_pdf('resume_one_page.pdf')
    with open('extracted_text.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Text extracted and saved to extracted_text.txt")
