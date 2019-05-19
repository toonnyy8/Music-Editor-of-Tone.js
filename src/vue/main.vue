<template>
  <div id="main">
    <!--look plugin-->
    <div
      id="PluginDialog"
      class="mdc-dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="my-dialog-title"
      aria-describedby="my-dialog-content"
    >
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
          <h2 class="mdc-dialog__title" id="my-dialog-title">
            <!--
            -->
            {{pluginDialog.title}}
            <!--
            -->
          </h2>
          <div class="mdc-dialog__content" id="my-dialog-content">Dialog body text goes here.</div>
          <footer class="mdc-dialog__actions">
            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
              <span class="mdc-button__label">No</span>
            </button>
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="yes"
            >
              <span class="mdc-button__label">Yes</span>
            </button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>

    <button class="mdc-fab" v-on:click="AddBlock()" style="width:100px;height:100px">Add Block</button>
    <button
      class="mdc-fab"
      v-on:click="CompileMusic()"
      style="width:100px;height:100px"
    >Compile Music</button>
    <button
      class="mdc-fab"
      v-on:click="DownloadFile()"
      style="width:100px;height:100px"
    >Download File</button>
    <button class="mdc-fab" v-on:click="LoadFile()" style="width:100px;height:100px">Load File</button>
    <br>
    <br>
    <table>
      <tr>
        <th v-for="block in blocks" :key="block.id" valign="top">
          <block
            :block="block"
            :DeleteBlock="DeleteBlock"
            :LookPlugin="LookPlugin"
            :BindPluginChannel="BindPluginChannel"
          ></block>
        </th>
      </tr>
    </table>
  </div>
</template>
<script defer>
import { MDCDialog } from "@material/dialog";
import block from "./main/block.vue";

export default {
  components: {
    block: block
  },
  data: {
    blocks: [],
    /*
     *[
     * {id:0,plugins:{id:0,pluginChannel:channel,pluginType,
     * data:{
     * oscillator:{
     * type: "custom",
     * partials:[],
     * },
     * envelope:{
              attack,
              attackCurve,
              decay,
              decayCurve,
              sustain,
              release,
              releaseCurve
            }
          }
        },
     * beatsPerMinute:60,
     * musicalNotation[new Uint16Array(new ArrayBuffer(120 * 2))]
      }
     * ]
     *
     */
    pluginDialog: { dialog: null, title: null },
    compileMusicChannel: new BroadcastChannel("compileMusicChannel")
  },
  mounted() {
    let globalChannel = new BroadcastChannel("globalChannel");
    globalChannel.onmessage = event => {
      switch (event.data.instruction) {
        case "Sub Window Creat": {
          let index = event.data.title.split(":")[1].split("-");

          if (
            this.blocks[index[0]].plugins[index[1]] != null &&
            this.blocks[index[0]].plugins[index[1]].pluginChannel == null
          ) {
            this.blocks[index[0]].plugins[
              index[1]
            ].pluginChannel = new BroadcastChannel(event.data.title);
            this.BindPluginChannel(this.blocks[index[0]].plugins[index[1]]);
          }
          switch (this.blocks[index[0]].plugins[index[1]].pluginType) {
            case "base": {
              this.blocks[index[0]].plugins[index[1]].pluginChannel.postMessage(
                {
                  instruction: "Init Data",
                  oscillator: this.blocks[index[0]].plugins[index[1]].data
                    .oscillator,
                  envelope: this.blocks[index[0]].plugins[index[1]].data
                    .envelope,
                  beatsPerMinute: this.blocks[index[0]].plugins[index[1]].data
                    .beatsPerMinute,
                  musicalNotation: this.blocks[index[0]].plugins[index[1]].data
                    .musicalNotation,
                  lengthPerDuration: this.blocks[index[0]].plugins[index[1]]
                    .data.lengthPerDuration,
                  volume: this.blocks[index[0]].plugins[index[1]].data.volume,
                  polyphony: this.blocks[index[0]].plugins[index[1]].data
                    .polyphony
                }
              );
              break;
            }
            case "filter": {
              break;
            }
            case "P lag": {
              this.blocks[index[0]].plugins[index[1]].pluginChannel.postMessage(
                {
                  instruction: "Init Data",
                  beatsPerMinute: this.blocks[index[0]].plugins[index[1]].data
                    .beatsPerMinute,
                  delayedBeats: this.blocks[index[0]].plugins[index[1]].data
                    .delayedBeats
                }
              );
              break;
            }
            case "B lag": {
              this.blocks[index[0]].plugins[index[1]].pluginChannel.postMessage(
                {
                  instruction: "Init Data",
                  beatsPerMinute: this.blocks[index[0]].plugins[index[1]].data
                    .beatsPerMinute,
                  delayedBeats: this.blocks[index[0]].plugins[index[1]].data
                    .delayedBeats
                }
              );
              break;
            }
            default:
              break;
          }

          break;
        }
        default:
          break;
      }
    };

    window.onunload = () => {
      for (let i = 0; i < this.blocks.length; i++) {
        for (let j = 0; j < this.blocks[i].plugins.length; j++) {
          if (this.blocks[i].plugins[j].pluginChannel != null) {
            this.blocks[i].plugins[j].pluginChannel.postMessage({
              instruction: "Close Window"
            });
            this.blocks[i].plugins[j].pluginChannel.close();
            this.blocks[i].plugins[j].pluginChannel = null;
          }
        }
      }
    };

    this.pluginDialog.dialog = new MDCDialog(
      document.querySelector("#PluginDialog")
    );
  },
  updated() {},
  methods: {
    AddBlock: function() {
      this.blocks.push({
        id: this.blocks.length,
        plugins: []
      });

      console.log("AddBlock");
    },
    DeleteBlock: function(blockIndex) {
      console.log("DeleteBlock");
      for (let i = 0; i < this.blocks[blockIndex].plugins.length; i++) {
        if (this.blocks[blockIndex].plugins[i].pluginChannel != null) {
          this.blocks[blockIndex].plugins[i].pluginChannel.postMessage({
            instruction: "Close Window"
          });
          this.blocks[blockIndex].plugins[i].pluginChannel.close();
          this.blocks[blockIndex].plugins[i].pluginChannel = null;
        }
      }
      this.blocks.splice(blockIndex, 1);
      for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].id = i;
        for (let j = 0; j < this.blocks[i].plugins.length; j++) {
          this.blocks[i].plugins[j].id = j;
          if (this.blocks[i].plugins[j].pluginChannel != null) {
            let windowTitle = `SetPlugin:${i}-${j}:${
              this.blocks[i].plugins[j].pluginType
            }`;
            this.blocks[i].plugins[j].pluginChannel.postMessage({
              instruction: "Rename Window",
              title: windowTitle
            });
            this.blocks[i].plugins[j].pluginChannel.close();
            this.blocks[i].plugins[j].pluginChannel = new BroadcastChannel(
              windowTitle
            );
            this.BindPluginChannel(this.blocks[i].plugins[j]);
          }
        }
      }
    },
    LookPlugin: function(pluginType) {
      this.pluginDialog.title = pluginType;
      this.pluginDialog.dialog.open();
    },
    BindPluginChannel: function(plugin) {
      plugin.pluginChannel.onmessage = function(event) {
        switch (event.data.instruction) {
          case "Sub Window Close": {
            plugin.pluginChannel.close();
            plugin.pluginChannel = null;
            console.log("close", plugin);
            break;
          }
          case "Set Plugin Data": {
            switch (plugin.pluginType) {
              case "base": {
                plugin.data.oscillator =
                  event.data.oscillator || plugin.data.oscillator;
                plugin.data.envelope =
                  event.data.envelope || plugin.data.envelope;
                plugin.data.beatsPerMinute =
                  event.data.beatsPerMinute || plugin.data.beatsPerMinute;
                plugin.data.musicalNotation =
                  event.data.musicalNotation || plugin.data.musicalNotation;
                plugin.data.lengthPerDuration =
                  event.data.lengthPerDuration || plugin.data.lengthPerDuration;
                plugin.data.volume = event.data.volume || plugin.data.volume;
                plugin.data.polyphony =
                  event.data.polyphony || plugin.data.polyphony;
                break;
              }
              case "filter": {
                break;
              }
              case "P lag": {
                plugin.data.beatsPerMinute =
                  event.data.beatsPerMinute || plugin.data.beatsPerMinute;
                plugin.data.delayedBeats =
                  event.data.delayedBeats || plugin.data.delayedBeats;
                break;
              }
              case "B lag": {
                plugin.data.beatsPerMinute =
                  event.data.beatsPerMinute || plugin.data.beatsPerMinute;
                plugin.data.delayedBeats =
                  event.data.delayedBeats || plugin.data.delayedBeats;
                break;
              }
              default:
                break;
            }

            break;
          }
          default:
            break;
        }
      };
    },
    CompileMusic() {
      window.open("./index.html", "CompileMusic");
      this.compileMusicChannel.onmessage = event => {
        switch (event.data.instruction) {
          case "next": {
            for (let i = event.data.blockNum; i < this.blocks.length; i++) {
              for (
                let j = i == event.data.blockNum ? event.data.pluginNum : 0;
                j < this.blocks[i].plugins.length;
                j++
              ) {
                console.log("postData");

                this.compileMusicChannel.postMessage({
                  instruction: "postData",
                  blockNum: i,
                  pluginNum: j,
                  data: this.blocks[i].plugins[j]
                });
                return;
              }
            }

            console.log("end");

            this.compileMusicChannel.postMessage({
              instruction: "end"
            });
            break;
          }

          default:
            break;
        }
      };
    },
    DownloadFile() {
      let blob = new Blob([JSON.stringify(this.blocks)], {
        type: "application/json"
      });
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      let filename = "MET.json";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    LoadFile() {
      let load = document.createElement("input");
      load.type = "file";
      load.accept = ".json,.met";

      load.onchange = event => {
        const files = load.files;
        console.log(files[0]);
        var reader = new FileReader();
        reader.addEventListener("loadend", () => {
          console.log(JSON.parse(reader.result));
          this.blocks = JSON.parse(reader.result);
          // reader.result contains the contents of blob as a typed array
        });
        reader.readAsBinaryString(files[0]);
      };

      load.click();
    }
  }
};
</script>
<style>
:root {
  --mdc-theme-mytheme: #5a2765;
}
.my-card {
  width: 200px;
}
.mdc-button:not(:disabled).mdc-button-dark {
  color: var(--mdc-theme-mytheme);
}
</style>
