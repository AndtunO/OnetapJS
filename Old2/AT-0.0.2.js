/*====================
    全局变量
 =====================*/
var cfgAuthor = "CFG By AT";//WaterMark左侧文字
var jsVersion = "0.0.1";//JS版本号
var jsLastUpDateTime = "2021年5月12日00:02:16";//JS最后更新时间
var userName = Cheat.GetUsername();//Onetap用户名
var screenX = Render.GetScreenSize()[0];//屏幕X轴最大值
var screenY = Render.GetScreenSize()[1];//屏幕Y轴最大值



/*====================
    控制台信息模块
 =====================*/
//JS载入通告
Cheat.PrintColor([255, 255, 255, 255], "===========================================\n");
Cheat.PrintColor([132, 112, 255, 255], "•> AT.js | Ver" + jsVersion + " <•\n");
Cheat.PrintColor([51, 255, 204, 255], "[AT] 感谢使用AT.js,尊敬的用户" + userName + "您好! \n");
Cheat.PrintColor([255, 255, 255, 255], "\n");
Cheat.PrintColor([255, 85, 55, 255], "信息: \n");
Cheat.PrintColor([255, 85, 55, 255], "JS正在努力的成长中....\n");
Cheat.PrintColor([255, 85, 55, 255], "最后更新时间:" + jsLastUpDateTime + "\n");
Cheat.PrintColor([132, 112, 255, 255], "•> JS by AndTun | Q1791314878 <•\n");
Cheat.PrintColor([255, 255, 255, 255], "===========================================\n");



/*====================
    根目录UI
 =====================*/
UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "AT Gui"); //添加AT Gui 界面



/*====================
   AT Gui 菜单监视
=====================*/
function AT_Gui_Monitor() {
    //WaterMark水印模块
    if (UI.GetValue(["Visuals", "SUBTAB_MGR", "AT Gui", "WaterMark"]) == 1) {
        WaterMark_ON();
    } else {
        WaterMark_OFF();
    }
    //Health & Armor血甲条模块
    if (UI.GetValue(["Visuals", "SUBTAB_MGR", "AT Gui", "Health & Armor"]) == 1) {
        HealthArmor_ON();
    } else {
        HealthArmor_OFF();
    }
}

Cheat.RegisterCallback("Draw", "AT_Gui_Monitor");//回调



/*=============
    方法模块
 ==============*/
//向控制台发送信息的方法
function ConsolePrint(teyp, text) {//类型，内容
    switch (teyp) {
        case 0://普通信息
            Cheat.PrintColor([51, 255, 204, 255], "• > " + text + "\n");
            break;
        case 1://警告信息
            Cheat.PrintColor([255, 85, 55, 255], "!! >" + text + "\n");
            break;
        default:
            Cheat.PrintColor([255, 255, 255, 255], "ConsolePrint || 错误...\n");
            break;
    }
}

//获取本地玩家信息的方法
function Get_Prop(table, prop) {
    const Prop = Entity.GetProp(Entity.GetLocalPlayer(), table, prop);
    return Prop;
}

//计算: 乘
function multiply(a, b) {
    const multiply = a * b
    return multiply
}


/*====================
    WaterMark水印模块
 =====================*/
UI.AddCheckbox(["Visuals", "AT Gui", "AT Gui"], "WaterMark");
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "WaterMark Background Colour"); //颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Background Colour"], [50, 50, 50, 120]);//设置默认颜色
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "WaterMark Logo Colour"); //颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Logo Colour"], [255, 255, 255, 245]);//设置默认颜色
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "WaterMark Line Colour"); //颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Line Colour"], [255, 255, 255, 200]);//设置默认颜色
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "WaterMark Font Colour"); //颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Font Colour"], [255, 255, 255, 200]);//设置默认颜色
UI.AddSliderInt(["Visuals", "AT Gui", "AT Gui"], "WaterMark X", 0, screenX);
UI.AddSliderInt(["Visuals", "AT Gui", "AT Gui"], "WaterMark Y", 0, screenY);
UI.SetValue(["Visuals", "AT Gui", "AT Gui", "WaterMark X"], screenX / 2 - 138);//screenX - 320);
UI.SetValue(["Visuals", "AT Gui", "AT Gui", "WaterMark Y"], 10);

//开启
function WaterMark_ON() {
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Background Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Logo Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Line Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Font Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark X"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Y"], 1);

    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;//活着时才显示

    var x = UI.GetValue(["Visuals", "AT Gui", "AT Gui", "WaterMark X"]);
    var y = UI.GetValue(["Visuals", "AT Gui", "AT Gui", "WaterMark Y"]);
    var barColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Background Colour"]);
    var logoColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Logo Colour"]);
    var fontColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Font Colour"]);
    var lineColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "WaterMark Line Colour"]);
    var logoIconFont = Render.GetFont("AT-IconFont.ttf", 22, false);
    var miscIconFont = Render.GetFont("AT-IconFont.ttf", 13, false);
    var miscFont = Render.GetFont("AT-ArturitoSlab.ttf", 13, false);
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ping = Math.round(Get_Prop("CPlayerResource", "m_iPing")).toString();
    //上底
    Render.GradientRect(x - 20, y - 1, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 255], [lineColor[0], lineColor[1], lineColor[2], 5]);
    Render.GradientRect(x + 140, y - 1, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 5], [lineColor[0], lineColor[1], lineColor[2], 255]);
    //中左
    Render.GradientRect(x - 21, y + 1, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 22, y + 3, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 23, y + 5, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 24, y + 7, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 25, y + 9, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 26, y + 11, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 27, y + 13, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    Render.GradientRect(x - 28, y + 15, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 255], [barColor[0], barColor[1], barColor[2], 5]);
    //中右
    Render.GradientRect(x + 141, y + 1, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 142, y + 3, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 143, y + 5, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 144, y + 7, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 145, y + 9, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 146, y + 11, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 147, y + 13, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    Render.GradientRect(x + 148, y + 15, 150, 2, 1, [barColor[0], barColor[1], barColor[2], 5], [barColor[0], barColor[1], barColor[2], 255]);
    //下底
    Render.GradientRect(x - 29, y + 17, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 255], [lineColor[0], lineColor[1], lineColor[2], 5]);
    Render.GradientRect(x + 149, y + 17, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 5], [lineColor[0], lineColor[1], lineColor[2], 255]);
    //文字
    Render.String(x + 125, y - 2, 0, "l", logoColor, logoIconFont);//LOGO图标
    Render.String(x + -18, y + 2, 0, "v", fontColor, miscIconFont);//左侧图标
    Render.String(x + -5, y + 1, 0, "AT.JS | " + cfgAuthor, fontColor, miscFont);//左边文字
    Render.String(x + 208, y + 2, 0, "1", fontColor, miscIconFont);//时间图标
    Render.String(x + 155, y + 1, 0, hours + ":" + minutes + ":" + seconds, fontColor, miscFont);//时间文字
    Render.String(x + 276, y + 2, 0, "S", fontColor, miscIconFont);
    Render.String(x + 225, y + 1, 0, "| " + ping + "ms", fontColor, miscFont);
}
//关闭
function WaterMark_OFF() {
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Background Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Font Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Logo Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Line Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark X"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "WaterMark Y"], 0);
}



/*============================
    Health & Armor血甲条模块
 =============================*/
UI.AddCheckbox(["Visuals", "AT Gui", "AT Gui"], "Health & Armor");//添加选择框: Health & Armor
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "Health Colour");
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "Armor Colour");
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "Health & Armor Background Colour");
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "Health & Armor Line Colour");
UI.AddColorPicker(["Visuals", "AT Gui", "AT Gui"], "Health & Armor Font Colour");
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "Health & Armor Background Colour"], [50, 50, 50, 120]);//设置默认颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "Health Colour"], [255, 34, 34, 200]);//设置默认颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "Armor Colour"], [64, 224, 208, 200]);//设置默认颜色
UI.SetColor(["Visuals", "AT Gui", "AT Gui", "Health & Armor Font Colour"], [255, 255, 255, 200]);//设置默认颜色
UI.AddSliderInt(["Visuals", "AT Gui", "AT Gui"], "Health & Armor X", 0, screenX);
UI.AddSliderInt(["Visuals", "AT Gui", "AT Gui"], "Health & Armor Y", 0, screenY);
UI.SetValue(["Visuals", "AT Gui", "AT Gui", "Health & Armor X"], 35);
UI.SetValue(["Visuals", "AT Gui", "AT Gui", "Health & Armor Y"], screenY - 40);

//开启
function HealthArmor_ON() {
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Armor Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Line Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Font Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Background Colour"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor X"], 1);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Y"], 1);
    
    //活着时才显示
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) {
        Convar.SetFloat("hidehud", 0);
        return;
    } else {
        Convar.SetFloat("hidehud", 8);
    }

    var HealthArmorIco = Render.GetFont("AT-Icons.ttf", 18, false);//图标
    var HealthArmorFont = Render.GetFont("AT-ArturitoSlab.ttf", 20, false);//字体
    var hp = Get_Prop("CBasePlayer", "m_iHealth");//获取血量
    var arm = Get_Prop("CCSPlayerResource", "m_iArmor");//获取护甲
    var hpColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "Health Colour"]);
    var armColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "Armor Colour"]);
    var barColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "Health & Armor Background Colour"]);
    var lineColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "Health & Armor Line Colour"]);
    var fontColor = UI.GetColor(["Visuals", "AT Gui", "AT Gui", "Health & Armor Font Colour"]);
    var x = UI.GetValue(["Visuals", "AT Gui", "AT Gui", "Health & Armor X"]);
    var y = UI.GetValue(["Visuals", "AT Gui", "AT Gui", "Health & Armor Y"]);
    //背景
    Render.GradientRect(x - 8, y - 40, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 255], [lineColor[0], lineColor[1], lineColor[2], 5]);
    Render.GradientRect(x + 158, y - 40, 150, 2, 1, [lineColor[0], lineColor[1], lineColor[2], 5], [lineColor[0], lineColor[1], lineColor[2], 255]);
    Render.FilledRect(x - 8, y - 38, 316, 60, barColor);
    //血甲条
    if (hp < 300) {
        Render.FilledRect(x + 2, y + 2, multiply(hp, 3), 16, [0, 0, 0, 80]);
        Render.FilledRect(x, y, multiply(hp, 3), 16, hpColor);
    } else {
        Render.FilledRect(x, y, 300, 16, hpColor);
    }
    if (arm < 300) {
        Render.FilledRect(x + 2, y - 8, multiply(arm, 3), 6, [0, 0, 0, 80]);
        Render.FilledRect(x, y - 10, multiply(arm, 3), 6, armColor);
    } else {
        Render.FilledRect(x, y - 10, 300, 6, armColor);
    }
    //血量数字
    Render.String(x + 28, y - 33, 1, "3", fontColor, HealthArmorIco)//图标
    Render.String(x + 68, y - 37, 1, hp.toString(), fontColor, HealthArmorFont)//数字
    //护甲数字
    Render.String(x + 272, y - 33, 1, "a", fontColor, HealthArmorIco)//图标
    Render.String(x + 232, y - 37, 1, arm.toString(), fontColor, HealthArmorFont)//数字
}

//关闭
function HealthArmor_OFF() {
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Armor Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Line Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Font Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Background Colour"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor X"], 0);
    UI.SetEnabled(["Visuals", "AT Gui", "AT Gui", "Health & Armor Y"], 0);
}



/*=======================================
    BuyList&BuyLog 敌方购买清单&日志模块
 ========================================*/
 