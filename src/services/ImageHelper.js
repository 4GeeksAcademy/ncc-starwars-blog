export const RandomImage=(elementType)=>{
    let image_array=[];
    if (typeof elementType !== "string") return
    //console.log(elementType,'<< elementType')
    image_array['people']=[
        "https://lumiere-a.akamaihd.net/v1/images/mother-aniseya-main_7ffc85e5.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/jecki-lon-main_3b0268ec.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/indara-main_a497ba73.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/mother-aniseya-main_7ffc85e5.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/boba-fett-main_a8fade4d.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/fennec-shand-main_298dc37c.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/the-book-of-boba-fett-chapter-1-story-gallery-02_a61669_68a1c6f0.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/the-book-of-boba-fett-ch-6-story-gallery-07_9e08ccc3.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/anakin-skywalker-main_7599d875.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/Padme-Amidala_05d50c8a.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/obi-wan-kenobi-main_5679d74e.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/sw-rotj-luke-skywalker-palpatine_02a9e911.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/sw-soulmate-leia-result-quiz-and-poll-images_04527594.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/chewie-main_906097a5.jpeg"
    ]
    image_array['planets']=[
        "https://lumiere-a.akamaihd.net/v1/images/plagueis-main-v1_b596bc2a.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/bunta-tree-main_598ecc76.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/dandoran_4173a4f5.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/er_kit_5df42d73.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/kessel-main_9ebae664.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/databank_rodia_01_169_6f76b79d.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/image_78a7da33.jpeg"
    ];
    image_array['vehicles']=[
        "https://lumiere-a.akamaihd.net/v1/images/jabiim-freight-transport-main_9651b654.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/zro-ff-003192_8754f5e0.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/juggernaut-main_d855e26d.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/a7-anti-vehicle-artillery-cannon_d7fb0e85.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/5ff895e40d603e0001462c74-image_ac3b4d2b.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/5fd3b5440d603e00013b5d32-image_15a9ed1c.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/image_bd1a1af3.jpeg",
        "https://lumiere-a.akamaihd.net/v1/images/image_5f8c42e5.jpeg"
    ];    
        
    let imageIDX = Math.floor(Math.random() * image_array[elementType].length);
    return image_array[elementType][imageIDX];
}