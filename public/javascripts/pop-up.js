var alerted = localStorage.getItem('alerted') || '';
    if (alerted != 'yes') {
     alert("𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 \n 1. Log in to your account or register by pressing the Sign in button. \n 2. Select any of your dietary restrictions, main ingredients, and cuisine under the Diet menu. \n 3. View the recipes by pressing the view results button.\n 4. Save your favourite recipes by pressing the Save recipe button when signed in. \n 5. To view your saved recipes, press the Profile button.");
     localStorage.setItem('alerted','yes');
    }
