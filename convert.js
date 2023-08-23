const data = "DT_0063,가덕도\n" +
    "DT_0032,강화대교\n" +
    "DT_0031,거문도\n" +
    "DT_0029,거제도\n" +
    "DT_0026,고흥발포\n" +
    "DT_0049,광양\n" +
    "DT_0042,교본초\n" +
    "DT_0018,군산\n" +
    "DT_0017,대산\n" +
    "DT_0065,덕적도\n" +
    "DT_0057,동해항\n" +
    "DT_0062,마산\n" +
    "DT_0023,모슬포\n" +
    "DT_0007,목포\n" +
    "DT_0006,묵호\n" +
    "DT_0025,보령\n" +
    "DT_0041,복사초\n" +
    "DT_0005,부산\n" +
    "DT_0056,부산항신항\n" +
    "DT_0061,삼천포\n" +
    "DT_0010,서귀포\n" +
    "DT_0051,서천마량\n" +
    "DT_0022,성산포\n" +
    "DT_0093,소무의도\n" +
    "DT_0012,속초\n" +
    "IE_0061,신안가거초\n" +
    "DT_0008,안산\n" +
    "DT_0067,안흥\n" +
    "DT_0037,어청도\n" +
    "DT_0016,여수\n" +
    "DT_0092,여호항\n" +
    "DT_0003,영광\n" +
    "DT_0044,영종대교\n" +
    "DT_0043,영흥도\n" +
    "IE_0062,옹진소청초\n" +
    "DT_0027,완도\n" +
    "DT_0039,왕돌초\n" +
    "DT_0013,울릉도\n" +
    "DT_0020,울산\n" +
    "DT_0068,위도\n" +
    "IE_0060,이어도\n" +
    "DT_0001,인천\n" +
    "DT_0052,인천송도\n" +
    "DT_0024,장항\n" +
    "DT_0004,제주\n" +
    "DT_0028,진도\n" +
    "DT_0021,추자도\n" +
    "DT_0050,태안\n" +
    "DT_0014,통영\n" +
    "DT_0002,평택\n" +
    "DT_0091,포항\n" +
    "DT_0066,향화도\n" +
    "DT_0011,후포\n" +
    "DT_0035,흑산도";

const result = data.split("\n")
    .map(s => {
        const s1 = s.split(",");
        return `createSubObservatory("${s1[0]}", "${s1[1]}")`
        }
    ).join(",");
console.log(result);