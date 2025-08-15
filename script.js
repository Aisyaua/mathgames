/**
 * Memperbarui tampilan koleksi hewan.
 */
function updateCollectionDisplay() {
    animalCollectionDiv.innerHTML = ''; // Hapus tampilan lama
    animalList.forEach(animal => {
        const animalElement = document.createElement('div');
        animalElement.className = 'text-center';
        // Gunakan tag <img> jika hewan sudah unlocked
        const imageHtml = animal.unlocked ? 
            `<img src="${animal.imageUrl}" alt="${animal.name}" class="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full border-2 border-green-500">` : 
            `<span class="text-4xl md:text-5xl opacity-30">❓</span>`;
        const text = animal.unlocked ? 
            `<p class="mt-1 text-sm text-gray-700 font-semibold">${animal.name}</p>` : 
            `<p class="mt-1 text-sm text-gray-400">Terkunci</p>`;
        animalElement.innerHTML = `${imageHtml}${text}`;
        animalCollectionDiv.appendChild(animalElement);
    });
}
