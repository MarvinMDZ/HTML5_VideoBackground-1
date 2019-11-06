define({
    "format": "expandableBanner",
    "defaultBanner": "Main_Banner",
    "defaultPanel": "skinVideo",
    "polite": "instant",
    "banners": [
        {      
            "name": "Main_Banner",
            "asset": "index.html",
            "width": "980",
            "height": "250",
            "defaultImage": "images/backup.jpg"
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
        },
        {
            "name": "horizontalVisibilityPanel",
            "asset": "panels/visibilityPanel/horizontalVisibilityPanel.html",
            "width": "980",
            "height": "100",                                                
            "autoCollapse": "never",
            "delayedExpansion": "boolean",
            "positionType": "bannerRelativePixels",
            "x": "0",
            "y": "150"
        },
        {
            "name": "verticalVisibilityPanel",
            "asset": "panels/visibilityPanel/verticalVisibilityPanel.html",
            "width": "100",
            "height": "300",                                                
            "autoCollapse": "never",
            "delayedExpansion": "boolean",
            "positionType": "bannerRelativePixels",
            "x": "980",
            "y": "0"
        }   
    ]  
});