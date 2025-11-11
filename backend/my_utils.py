def get_context(nama_provinsi: str):
    return f"""
    Kamu adalah Saraswati, seorang wanita yang bertugas mengenalkan budaya Indonesia kepada anak-anak lewat percakapan. Kamu harus mengingat semua percakapan sebelumnya untuk menjaga konteks.

    Jawaban kamu:
    - Hanya boleh membahas budaya yang berasal dari {nama_provinsi}, seperti tarian daerah, makanan khas, pakaian adat, rumah tradisional, lagu daerah, permainan tradisional, dan cerita rakyat.
    - Tidak boleh menjawab jika pertanyaan tidak relevan dengan budaya dari provinsi tersebut. Jika pertanyaan melenceng, katakan dengan ramah bahwa kita hanya membahas budaya dari {nama_provinsi}.
    - Gunakan bahasa yang sangat mudah dimengerti oleh anak-anak.
    - Jawaban tidak boleh lebih dari 100 kata dan jawaban harus singkat dan jelas.
    - Jangan berikan respons seperti "budibot:"

    Contoh respons jika pertanyaan melenceng:
    "Maaf ya, kita cuma bisa cerita tentang budaya dari {nama_provinsi} saja. Yuk, tanya lagi hal seru tentang budaya di sini 😊"
    
    di bawah adalah percakapannya, kamu menjawab chat baru.

    """

def classifier_context(prompt: str, nama_provinsi: str):
    return f"""
    Periksa apakah prompt di bawah adalah meminta generate gambar yang berkaitan dengan budaya indonesia dari daerah {nama_provinsi}? jawab YA/TIDAK. prompt:
    {prompt}
    """


def return_genimage_context(province):
    return f"""
    Buatlah sebuah animasi lucu berdasarkan gambar yang diunggah, dengan menggabungkan elemen budaya dari {province}. Animasi ini harus mempertahankan komposisi, gaya visual, dan nuansa gambar asli, namun disesuaikan dengan sentuhan budaya lokal.

    Dalam animasi tersebut, tampilkan transformasi atau pergerakan yang memperlihatkan:
    - Perubahan pakaian menjadi pakaian tradisional khas {province}
    - Munculnya ornamen dan motif tradisional secara halus di pakaian atau latar
    - Pergeseran warna ke palet yang mencerminkan budaya {province}
    - Kemunculan arsitektur tradisional sebagai latar belakang atau elemen transisi
    - Penambahan aksesori atau benda budaya khas, seperti senjata tradisional, perhiasan, atau alat musik
    """


def quiz_context(province: str, num_questions: int):
    return f"""
    Buatlah {num_questions} soal kuis pilihan ganda tentang budaya Indonesia dari provinsi {province} yang cocok untuk anak-anak.

    Topik kuis mencakup:
    - Tarian daerah
    - Makanan khas
    - Pakaian adat
    - Rumah tradisional
    - Lagu daerah
    - Permainan tradisional
    - Cerita rakyat
    - Alat musik tradisional

    Format output harus dalam JSON dengan struktur berikut:
    {{
        "questions": [
            {{
                "question": "Pertanyaan yang mudah dipahami anak-anak",
                "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
                "correct_answer": "Pilihan yang benar",
                "explanation": "Penjelasan singkat mengapa jawaban ini benar (maksimal 50 kata)"
            }}
        ]
    }}

    Persyaratan:
    - Gunakan bahasa yang sangat mudah dimengerti anak-anak
    - Setiap soal harus memiliki 4 pilihan jawaban
    - Jawaban benar harus bervariasi posisinya (tidak selalu A atau C)
    - Penjelasan harus singkat, jelas, dan edukatif
    - Soal harus menarik dan tidak membosankan
    - Hanya kembalikan JSON tanpa teks tambahan apapun
    """
