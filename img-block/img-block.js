(function(blocks, element, editor, components) {
  var el = element.createElement;
  var registerBlockType = blocks.registerBlockType;
  var MediaUpload = editor.MediaUpload;
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
        "div",
        {
          className: "container"
        },
        el(
          "div",
          {
            className: "img-upload-pc"
          },
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
            render: function render(_obj) {
              var open = _obj.open;
              return getImageButton("pc", open);
            }
          })
        ),
        el("br", null),
        el(
          "div",
          {
            className: "img-upload-sp"
          },
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
            render: function render(_obj) {
              var open = _obj.open;
              return getImageButton("sp", open);
            }
          })
        )
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
// const { Button } = wp.components;

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
//       <div className="container">
//         <div className="img-upload-pc">
//           <p> Select image for pc </p>
//           <MediaUpload
//             onSelect={media => {
//               setAttributes({
//                 pc: { imageAlt: media.alt, imageUrl: media.url }
//               });
//             }}
//             type="image"
//             value={attributes.imageID}
//             render={({ open }) => getImageButton("pc", open)}
//           />
//         </div>

//         <br />

//         <div className="img-upload-sp">
//           <p> Select image for smartphone </p>
//           <MediaUpload
//             onSelect={media => {
//               setAttributes({
//                 sp: { imageAlt: media.alt, imageUrl: media.url }
//               });
//             }}
//             type="image"
//             value={attributes.imageID}
//             render={({ open }) => getImageButton("sp", open)}
//           />
//         </div>
//       </div>
//     );
//   },

//   save({ attributes }) {
//     let imgBlock;
//     const cardRender = bp => {


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

//       if (!src) return null;

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
