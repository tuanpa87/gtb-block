(function(blocks, element, editor, components) {
  var el = element.createElement;
  var Fragment = element.Fragment;
  var registerBlockType = blocks.registerBlockType;
  var MediaUpload = editor.MediaUpload;
  var TabPanel = components.TabPanel;
  var Button = components.Button;

  registerBlockType("img-block/main", {
    title: "IMG",
    icon: "heart",
    category: "common",
    attributes: {
      pc: {
        imageAlt: {
          attribute: "alt",
          selector: ".img-pc"
        },
        imageUrl: {
          attribute: "src",
          selector: ".img-pc"
        }
      },
      sp: {
        imageAlt: {
          attribute: "alt",
          selector: ".img-sp"
        },
        imageUrl: {
          attribute: "src",
          selector: ".img-sp"
        }
      }
    },

    edit: function edit(props) {
      var attributes = props.attributes,
        className = props.className,
        setAttributes = props.setAttributes;

      // var onSelectTab = function onSelectTab(tabName) {
      //   console.log('Selecting tab', tabName);
      // };

      var getImageButton = function getImagePcButton(bp, openEvent) {
        var bpAttributes;

        if (bp == "sp") {
          bpAttributes = attributes.sp;
        } else {
          bpAttributes = attributes.pc;
        }

        if (bpAttributes) {
          return el("img", {
            src: bpAttributes.imageUrl,
            onClick: openEvent,
            className: "image"
          });
        } else {
          return el(
            "div",
            {
              className: "button-container"
            },
            el(
              Button,
              {
                onClick: openEvent,
                className: "button button-large"
              },
              "Pick an image"
            )
          );
        }
      };

      return el(
        TabPanel,
        {
          className: "block-img-container", //onSelect={ onSelectTab }
          tabs: [
            {
              name: "pc",
              title: "PC",
              className: "img-upload-pc"
            },
            {
              name: "sp",
              title: "SP",
              className: "img-upload-sp"
            }
          ]
        },
        function(tab) {
          return el(
            "div",
            null,
            tab.name === "pc"
              ? el(
                  Fragment,
                  null,
                  el("p", null, " Select image for pc "),
                  el(MediaUpload, {
                    onSelect: function onSelect(media) {
                      setAttributes({
                        pc: {
                          imageAlt: media.alt,
                          imageUrl: media.url
                        }
                      });
                    },
                    type: "image",
                    value: attributes.imageID,
                    render: function render(_obj1) {
                      var open = _obj1.open;
                      return getImageButton("pc", open);
                    }
                  })
                )
              : el(
                  Fragment,
                  null,
                  el("p", null, " Select image for smartphone "),
                  el(MediaUpload, {
                    onSelect: function onSelect(media) {
                      setAttributes({
                        sp: {
                          imageAlt: media.alt,
                          imageUrl: media.url
                        }
                      });
                    },
                    type: "image",
                    value: attributes.imageID,
                    render: function render(_obj2) {
                      var open = _obj1.open;
                      return getImageButton("sp", open);
                    }
                  })
                )
          );
        }
      );
    },

    save: function save(props) {
      var attributes = props.attributes;
      var imgBlock;

      var cardRender = function cardPc(bp) {
        var className = "img-fluid",
          src,
          alt;

        if (bp == "sp") {
          className += " img-sp";
          src = attributes.sp.imageUrl;
          alt = attributes.sp.imageAlt;
        } else {
          className += " img-pc";
          src = attributes.pc.imageUrl;
          alt = attributes.pc.imageAlt;
        }

        if (!src) return null;

        if (alt) {
          return el("img", {
            className: className,
            src: src,
            alt: alt
          });
        } // No alt set, so let's hide it from screen readers

        return el("img", {
          className: className,
          src: src,
          alt: "",
          "aria-hidden": "true"
        });
      };

      if (attributes.pc && attributes.sp) {
        imgBlock = el(
          "div",
          {
            className: "card"
          },
          el(
            "div",
            {
              className: "d-none d-md-block"
            },
            cardRender("pc")
          ),
          el(
            "div",
            {
              className: "d-block d-md-none"
            },
            cardRender("sp")
          )
        );
      } else if (attributes.pc && !attributes.sp) {
        imgBlock = el(
          "div",
          {
            className: "card"
          },
          cardRender("pc")
        );
      } else if (!attributes.pc && attributes.sp) {
        imgBlock = el(
          "div",
          {
            className: "card"
          },
          cardRender("sp")
        );
      } else {
        imgBlock = null;
      }

      return imgBlock;
    }
  });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);

/* ES Next Opt */
// const { RichText, MediaUpload, PlainText } = wp.editor;
// const { registerBlockType } = wp.blocks;
// const { Button, TabPanel } = wp.components;
// const { Fragment } = wp.element;

// registerBlockType("img-block/main", {
//   title: "Img",
//   icon: "heart",
//   category: "common",
//   attributes: {
//     pc: {
//       imageAlt: {
//         attribute: "alt",
//         selector: ".img-pc"
//       },
//       imageUrl: {
//         attribute: "src",
//         selector: ".img-pc"
//       }
//     },
//     sp: {
//       imageAlt: {
//         attribute: "alt",
//         selector: ".img-sp"
//       },
//       imageUrl: {
//         attribute: "src",
//         selector: ".img-sp"
//       }
//     }
//   },
//   edit({ attributes, className, setAttributes }) {
//     // const onSelectTab = ( tabName ) => {
//     //     console.log( 'Selecting tab', tabName );
//     // };

//     const getImageButton = (bp, openEvent) => {
//       var bpAttributes;
//       if (bp == "sp") {
//         bpAttributes = attributes.sp;
//       } else {
//         bpAttributes = attributes.pc;
//       }

//       if (bpAttributes) {
//         return (
//           <img
//             src={bpAttributes.imageUrl}
//             onClick={openEvent}
//             className="image"
//           />
//         );
//       } else {
//         return (
//           <div className="button-container">
//             <Button onClick={openEvent} className="button button-large">
//               Pick an image
//             </Button>
//           </div>
//         );
//       }
//     };

//     return (
//       <TabPanel
//         className="block-img-container"
//         //onSelect={ onSelectTab }
//         tabs={[
//           {
//             name: "pc",
//             title: "PC",
//             className: "img-upload-pc"
//           },
//           {
//             name: "sp",
//             title: "SP",
//             className: "img-upload-sp"
//           }
//         ]}
//       >
//         {tab => (
//           <div>
//             {tab.name === "pc" ? (
//               <Fragment>
//                 <p> Select image for pc </p>
//                 <MediaUpload
//                   onSelect={media => {
//                     setAttributes({
//                       pc: { imageAlt: media.alt, imageUrl: media.url }
//                     });
//                   }}
//                   type="image"
//                   value={attributes.imageID}
//                   render={({ open }) => getImageButton("pc", open)}
//                 />
//               </Fragment>
//             ) : (
//               <Fragment>
//                 <p> Select image for smartphone </p>
//                 <MediaUpload
//                   onSelect={media => {
//                     setAttributes({
//                       sp: { imageAlt: media.alt, imageUrl: media.url }
//                     });
//                   }}
//                   type="image"
//                   value={attributes.imageID}
//                   render={({ open }) => getImageButton("sp", open)}
//                 />
//               </Fragment>
//             )}
//           </div>
//         )}
//       </TabPanel>
//     );
//   },

//   save({ attributes }) {
//     let imgBlock;
//     const cardRender = bp => {
//       if (!src) return null;

//       let className = "img-fluid",
//         src,
//         alt;
//       if (bp == "sp") {
//         className += " img-sp";
//         src = attributes.sp.imageUrl;
//         alt = attributes.sp.imageAlt;
//       } else {
//         className += " img-pc";
//         src = attributes.pc.imageUrl;
//         alt = attributes.pc.imageAlt;
//       }

//       if (alt) {
//         return <img className={className} src={src} alt={alt} />;
//       }

//       // No alt set, so let's hide it from screen readers
//       return <img className={className} src={src} alt="" aria-hidden="true" />;
//     };

//     if (attributes.pc && attributes.sp) {
//       imgBlock = (
//         <div className="card">
//           <div className="d-none d-md-block">{cardRender("pc")}</div>
//           <div className="d-block d-md-none">{cardRender("sp")}</div>
//         </div>
//       );
//     } else if (attributes.pc && !attributes.sp) {
//       imgBlock = <div className="card">{cardRender("pc")}</div>;
//     } else if (!attributes.pc && attributes.sp) {
//       imgBlock = <div className="card">{cardRender("sp")}</div>;
//     } else {
//       imgBlock = null;
//     }

//     return imgBlock;
//   }
// });
