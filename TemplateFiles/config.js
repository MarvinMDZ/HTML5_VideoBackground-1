define({
    "format": "expandableBanner",
    "defaultBanner": "Main_Banner",
    "defaultPanel": "skinVideo",
    "polite": "instant",
    "banners": [
        {      
            "name": "Main_Banner",
            "asset": "index.html",
            "width": "1",
            "height": "1",
            "defaultImage": "images/1x1.jpg"
        }
    ],
    "panels": [
        {
            "name": "skinVideo",
            "asset": "panels/skinVideo/index.html",
            "width": "0",
            "height": "0",                                                
            "autoCollapse": "never",
            "delayedExpansion": "boolean",
            "positionType": "pageRelativePercentage",
            "x": "0",
            "y": "0"
        }   
    ]  
});