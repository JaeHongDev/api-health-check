<script lang="ts" setup>

import {reactive} from "vue";
import {ApiModel, ApiRunnableStatus, ApiStatus, ApiType, SubObservatory} from "./model/ApiModel.ts";


interface IHeader{
  title:string,
  align?: 'center' | 'start'
  sortable?: boolean,
  key: string
}


const selected = reactive([]);
const headers = reactive<IHeader[]> ([
  {
    title: 'api 유형',
    align: 'start',
    sortable: false,
    key: 'type',
  },
  { title: '경로', key: 'path' },
  { title: '실행', key: 'actions' },
]);
const baseUrl = "http://www.khoa.go.kr/api";
const serviceKey =  "wldhxng34hkddbsgm81lwldhxng34hkddbsgm81l==";

const createSubObservatory = (code: string, name: string) => {
  return {
    status: ApiStatus.PENDING,
    runnableStatus: ApiRunnableStatus.NOT_START,
    code,
    name
  } as SubObservatory
}
const data = reactive<ApiModel[]> ([
  /**
   * @summary 관측소별 데이터 제공현황
   */
  {
    type: ApiType.observatory,
    path: `${baseUrl}/oceangrid/ObsServiceObj/search.do?ServiceKey=${serviceKey}&ResultType=json`,
    subObservatory: [
      {
        name:"기본실행",code:"", status:ApiStatus.PENDING,runnableStatus: ApiRunnableStatus.NOT_START}
    ],
    createUrl:(code) => "http://www.khoa.go.kr/api/oceangrid/ObsServiceObj/search.do?ServiceKey=wldhxng34hkddbsgm81lwldhxng34hkddbsgm81l==&ResultType=json"
  },
  {
    type: ApiType.tideStation,
    path: "http://www.khoa.go.kr/api/oceangrid/DataType/search.do?ServiceKey=인증키&ObsCode=관측소번호&ResultType=json",
    subObservatory:[
      createSubObservatory("DT_0063", "가덕도"),createSubObservatory("DT_0032", "강화대교"),createSubObservatory("DT_0031", "거문도"),createSubObservatory("DT_0029", "거제도"),createSubObservatory("DT_0026", "고흥발포"),createSubObservatory("DT_0049", "광양"),createSubObservatory("DT_0042", "교본초"),createSubObservatory("DT_0018", "군산"),createSubObservatory("DT_0017", "대산"),createSubObservatory("DT_0065", "덕적도"),createSubObservatory("DT_0057", "동해항"),createSubObservatory("DT_0062", "마산"),createSubObservatory("DT_0023", "모슬포"),createSubObservatory("DT_0007", "목포"),createSubObservatory("DT_0006", "묵호"),createSubObservatory("DT_0025", "보령"),createSubObservatory("DT_0041", "복사초"),createSubObservatory("DT_0005", "부산"),createSubObservatory("DT_0056", "부산항신항"),createSubObservatory("DT_0061", "삼천포"),createSubObservatory("DT_0010", "서귀포"),createSubObservatory("DT_0051", "서천마량"),createSubObservatory("DT_0022", "성산포"),createSubObservatory("DT_0093", "소무의도"),createSubObservatory("DT_0012", "속초"),createSubObservatory("IE_0061", "신안가거초"),createSubObservatory("DT_0008", "안산"),createSubObservatory("DT_0067", "안흥"),createSubObservatory("DT_0037", "어청도"),createSubObservatory("DT_0016", "여수"),createSubObservatory("DT_0092", "여호항"),createSubObservatory("DT_0003", "영광"),createSubObservatory("DT_0044", "영종대교"),createSubObservatory("DT_0043", "영흥도"),createSubObservatory("IE_0062", "옹진소청초"),createSubObservatory("DT_0027", "완도"),createSubObservatory("DT_0039", "왕돌초"),createSubObservatory("DT_0013", "울릉도"),createSubObservatory("DT_0020", "울산"),createSubObservatory("DT_0068", "위도"),createSubObservatory("IE_0060", "이어도"),createSubObservatory("DT_0001", "인천"),createSubObservatory("DT_0052", "인천송도"),createSubObservatory("DT_0024", "장항"),createSubObservatory("DT_0004", "제주"),createSubObservatory("DT_0028", "진도"),createSubObservatory("DT_0021", "추자도"),createSubObservatory("DT_0050", "태안"),createSubObservatory("DT_0014", "통영"),createSubObservatory("DT_0002", "평택"),createSubObservatory("DT_0091", "포항"),createSubObservatory("DT_0066", "향화도"),createSubObservatory("DT_0011", "후포"),createSubObservatory("DT_0035", "흑산도")

    ],
    createUrl: (code) => {
      return `http://www.khoa.go.kr/api/oceangrid/tideObsRecent/search.do?ServiceKey=wldhxng34hkddbsgm81lwldhxng34hkddbsgm81l==&${code}1&ResultType=json`
      //return `http://www.khoa.go.kr/api/oceangrid/DataType/search.do?ServiceKey=${serviceKey}&ObsCode=${code}&ResultType=json`;
    }
  }

])

const executeApi = (api: ApiModel, subObservatory: SubObservatory) => {
  subObservatory.status = ApiStatus.RUNNING;

  fetch(api.createUrl(subObservatory.code))
      .finally(() => {
        subObservatory.status = ApiStatus.END;
        subObservatory.runnableStatus = ApiRunnableStatus.SUCCESS;
      })
}

const executeApis = (api: ApiModel) => {
  api.subObservatory.forEach(sub => executeApi(api, sub));
}
</script>

<template>
  <v-app>
    <v-main>
      <v-card class="h-100 d-flex ">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="data"
            item-value="name"
            show-select
            show-expand
            density="compact"
            class="elevation-1 pa-10"
        >

          <template v-slot:expanded-row="{ columns, item}">
            <tr>
              <td :colspan="columns.length">
                <v-list-item
                    v-for="folder in item.raw.subObservatory"
                    :key="folder.code"
                    :title="folder.name"
                >
                  <template v-slot:prepend>
                    {{folder.runnableStatus}}
                  </template>
                  <template v-slot:append>
                    {{folder.status}}
                    <v-btn
                        color="grey-lighten-1"
                        icon="mdi-run"
                        variant="text"
                        @click="executeApi(item.raw,folder)"
                    ></v-btn>
                  </template>
                </v-list-item>
                More info about {{ item.raw.name }}
              </td>
            </tr>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
                size="small"
                class="me-2 text-brown"
                @click="()=> executeApis(item.raw)"
            >
              mdi-run
            </v-icon>
            <v-icon
                size="small"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>


