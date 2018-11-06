/* global jQuery */
/* global wp */


/**
 * Customizer Control: JavaScript part of font control
 *
 * @package     Azbalac Controls
 * @subpackage  Controls
 * @copyright   Copyright (c) 2017, Ralf Geschke
 * @license     https://opensource.org/licenses/MIT
 * @since       0.1
 */

(function ($) {

   
wp.customize.controlConstructor.azbalac_font = wp.customize.Control.extend( {


    ready: function() {
        var control = this;
       
        this.container.on( 'event_font_updated', function() {
            var dataField = $(control.container).find('.azbalac_font_collector');
            var settingData = dataField.val();
            
            control.setting.set( settingData );
            return true;
        });
    
        control.initFontControl();
        
    },

     /**
     * Get all variant select fields with selected variant, load font data content, build options array and 
     * show selected option. In case of no ggl font chosen, hide variant select element.
     * 
     */
    displaySelectVariants: function() {
        var control = this;
        $(control.container).find('.customize-font-input-select-variant').each(function(idx) {
            var selectField = this;
            var variantSelected = $(selectField).attr('data-default-selected');
            var fontVariant = $(selectField).attr('data-font-variant'); // a kind of fallback in the case that variant data isn't stored into database
            // this can happen in the first case when database is empty and the 
            // variant select field is not updated (changed)
           
            if (variantSelected != '' || fontVariant == 'true') {
                if (variantSelected == '') {
                    // default is 'regular'
                    
                    variantSelected = 'regular';
                }
                $(selectField).parents('.font-input-select-variant').show();
                var fontSelected = $(selectField).parents('.customize-control-font-element').find('.customize-font-input-select').attr('data-default-selected');

                var requestData = {
                    action: "azbalac_get_font_data_action",
                    searchfont: fontSelected
                };
                $.ajax({
                    type: "POST",
                    url: ajaxurl,
         
                    dataType: "json",
                    data: requestData,
                    success: function (data, textStatus, jqXHR) {
                        
                        if (data != null) {
                        
                            if (typeof data.variants != 'undefined') {
                         
                                var selectOption = $(selectField).children()[0]; // string "-- select --"
                                $(selectField).empty().append(selectOption); 
                                
                                _.each(data.variants, function(choiceOption, choiceValue) {
                                    var variantData =  {
                                        'value': choiceOption,
                                        'text': choiceOption      
                                    };
                                    if (choiceOption == variantSelected) {
                                        variantData['selected'] = 'selected';
                                    }
                                    // choiceOption is the identifier string
                                    $('<option/>', variantData).appendTo(selectField);
                                 
                                });
                            }

                        }
    
                    },
                    error: function (errorMessage) {
                        // later: show error?
                        
                    }
                 
                });      
            } else {

                $(this).parents('.font-input-select-variant').hide();

            }
         

        });

    },

    /**
     * Find and update hidden data field with collection of values by submitting new elementData array.
     * At the end, this method triggers an event, so WordPress recognizes the changes.
     * 
     */
    updateCurrentDataField: function(elementData) {
        var control = this;
        var dataField = $(control.container).find('.azbalac_font_collector');
        var dataFieldId = dataField.attr('id');

        $(control.container).find('#' + dataFieldId).val( encodeURI( JSON.stringify( elementData ) ));
        dataField.trigger('event_font_updated'); 
    },

   
    onChangeSelectUpdate: function( event, element, elementData ) {
        var control = this;
        elementId = element.parents('.customize-control-font-element').attr('id');
        
        var newValue = element.val();

        elementData['font'] = newValue;

        // delete previously set ggl font data to prevent displaying old presets like another variant
        // if ggl font is chosen, the default variant should be active, i.e. "regular" or empty string
        if (typeof elementData['gglfontdata'] != 'undefined') {
            elementData['gglfontdata'] = null;
        }
        if (isNaN(parseInt(newValue))) { // no number, so we have Google Fonts
            $('#' + elementId).find('.font-input-select-variant').show();
            
            // get variants from backend and trigger another event
            // if no variant is chosen, nothing will be stored
            // default is 'regular'
            elementData['gglfont'] = true;
            
            var requestData = {
                action: "azbalac_get_font_data_action",
                searchfont: newValue
            };
     
            $.ajax({
                type: "POST",
                url: ajaxurl,
     
                dataType: "json",
                data: requestData,
                success: function (data, textStatus, jqXHR) {
                    
                    if (data != null) {
                        // trigger action which builds array of variants
                        element.trigger('event_font_gglfont_selected', [ element, elementId, data ]);

                        // this does not work due to asynchronous request
                        // get default (first) first variant to store into elementData
                        /*if (typeof data.variants != 'undefined') {
                            var defaultVariant = data.variants[0];
                            console.log("defaultVariant and file::");
                            console.log(defaultVariant);
                            console.log(data.files[defaultVariant]);
                            elementData['gglfontdata'] = {'variant': defaultVariant,
                                'file': data.files[defaultVariant]
                            };
                        }*/
                    }

                },
                error: function (errorMessage) {
                    // maybe later: write error message
                }
             
            });      
        
        } else {
            $('#' + elementId).find('.font-input-select-variant').hide();
            
            // no ggl font, remove ggl font contents
            elementData['gglfont'] = false;
            if (typeof elementData['gglfontdata'] != 'undefined') {
                elementData['gglfontdata'] = null;
            }
        }
        control.updateCurrentDataField(elementData, element);
                
    },


    onChangeSelectVariantUpdate: function( event, element, elementData ) {
        var control = this;
        elementId = element.parents('.customize-control-font-element').attr('id');
        
        var variant = element.val();

        var requestData = {
            action: "azbalac_get_font_data_action",
            searchfont: elementData['font']
        };
 
        $.ajax({
            type: "POST",
            url: ajaxurl,
 
            dataType: "json",
            data: requestData,
            success: function (data, textStatus, jqXHR) {
                if (data != null) {
                    // search variant and store filename into elementData array
                                     
                    if (typeof data.variants != 'undefined') {
                        if (typeof data.files[variant] != 'undefined') {
                            // variant found
                            var file = data.files[variant];

                        } else {
                            var file = ''; // no file submitted, use empty string.
                            // currently the font file is not used. Was: data.files[data.variants[0]];
                        }
                        elementData['gglfontdata'] = {'variant': variant,
                            'file': file
                        };
                        // call update function to store elementData
                        control.updateCurrentDataField(elementData);
                    }
                } // else nothing, default variant is regular if nothing chosen or empty

            },
            error: function (errorMessage) {
                // show error?
            }
         
        });      
    },

    onChangeSizeUpdate: function( event, element, elementData, newValue ) {
        var control = this;
        elementId = element.parents('.customize-control-font-element').attr('id');
       
        elementData['size'] = newValue;
        
        control.updateCurrentDataField(elementData, element);
                
    },


    initFontControl: function() {
        var control = this;
        var elementData = {};

       
        var element = $(this.container).find('.customize-control-font-element');

        var elementId = element.attr('id');
        var prevValue = $(control.container).find('.azbalac_font_collector').val();
     
        if (prevValue != '') {
            elementData = JSON.parse(decodeURI(prevValue));
            // todo: if gglfont, get variants and select chosen variant
        } else {
            elementData = {};
        }


        control.displaySelectVariants();

        // initialize key events to handle select fields
        $(this.container).on('change', '.customize-font-input-select', function (event) {
            control.onChangeSelectUpdate(event, $(this), elementData);
        });

        $(this.container).on('event_font_gglfont_selected', function(event, element, elementId, data) {

            var selectField = $('#' + elementId).find('.customize-font-input-select-variant');
            
            var selectOption = $(selectField).children()[0]; // string "-- select --"
            selectField.empty().append(selectOption); 
            
            _.each(data.variants, function(choiceOption, choiceValue) {
                // choiceOption is the identifier string
                var variantData =  {
                    'value': choiceOption,
                    'text': choiceOption                                      
                };

                if (choiceOption == 'regular') { // regular is the default value
                    // but 'regular' is not stored as default, because it's identically
                    // to an empty string
                    variantData['selected'] = 'selected';
                }
                $('<option/>', variantData).appendTo(selectField);
            });

        });


        $(this.container).on('change', '.customize-font-input-select-variant', function (event) {
            control.onChangeSelectVariantUpdate(event, $(this), elementData);
        });


        var sizeDefault = $('[id="input_size_' + elementId + '"]').attr('data-default');
        if (!sizeDefault) {
            sizeDefault = 0; // it has to be initialized with some value, fallback if no default size is submitted, 0 means nothing set, use size defined by theme
        }
        // if available, load current size from stored data
        if (typeof elementData['size'] != 'undefined') {
            sizeDefault = elementData['size'];
        } 

        $('[id="slider_size_' + elementId + '"]').slider({
            value: sizeDefault, min: 0, max: 120, step: 1,
            slide: function (event, ui) {
                $('[id="input_size_' + elementId + '"]').val(ui.value).keyup();
                
                control.onChangeSizeUpdate(event, $(this), elementData, ui.value);
                
            }
        });
        $('[id="input_size_' + elementId + '"]').val($('[id="slider_size_' + elementId + '"]').slider("value"));
  
       
     
    }


} );
  

})(jQuery);