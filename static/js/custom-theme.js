/* global jQuery */
/* global wp */


/**
 * Customizer Control: JavaScript part of theme (i.e. Bootstrap theme) loading control
 *
 * @package     Azbalac Controls
 * @subpackage  Controls
 * @copyright   Copyright (c) 2018, Ralf Geschke
 * @license     https://opensource.org/licenses/MIT
 * @since       0.1
 */

(function ($) {

   
wp.customize.controlConstructor.azbalac_theme = wp.customize.Control.extend( {


    ready: function() {
        var control = this;
       
        this.container.on( 'event_theme_updated', function() {
            var dataField = $(control.container).find('.azbalac_theme_collector');
            var settingData = dataField.val();
            
            control.setting.set( settingData );
            return true;
        });
    
        control.initControl();
        
    },

   

    /**
     * Find and update hidden data field with collection of values by submitting new elementData array.
     * At the end, this method triggers an event, so WordPress recognizes the changes.
     * 
     */
    updateCurrentDataField: function(elementData) {
        var control = this;
        var dataField = $(control.container).find('.azbalac_theme_collector');
        var dataFieldId = dataField.attr('id');

        $(control.container).find('#' + dataFieldId).val( encodeURI( JSON.stringify( elementData ) ));
        dataField.trigger('event_theme_updated'); 
    },

   
    onChangeSelectUpdate: function( event, element, elementData ) {
        var control = this;
        elementId = element.parents('.customize-control-theme-element').attr('id');
        
        var newValue = element.val();

        elementData['theme'] = newValue;

        console.log(elementData);
        if (parseInt(newValue) != 0) { // theme selected

           
            // get variants from backend and trigger another event
            // if no variant is chosen, nothing will be stored
            // default is 'regular'
           
            var requestData = {
                action: "azbalac_get_theme_data_action",
                searchtheme: newValue
            };
     
            $.ajax({
                type: "POST",
                url: ajaxurl,
     
                dataType: "json",
                data: requestData,
                success: function (data, textStatus, jqXHR) {
                    
                    if (data != null) {
                     
                        console.log(data);
                        elementData['data'] = data.value; // we only need values, theme id is set before
                        control.updateCurrentDataField(elementData, element);
                    }

                },
                error: function (errorMessage) {
                    // maybe later: write error message
                }
             
            });      
        
        } else { // fallback to default theme (bootstrap)
            
            // no ggl font, remove ggl font contents
            elementData['theme'] = 0;
            if (typeof elementData['data'] != 'undefined' ) {
                elementData['data'] = null;
            }
            control.updateCurrentDataField(elementData, element);
        }
    
                
    },


    


    initControl: function() {
        var control = this;
        var elementData = {};

       
        var element = $(this.container).find('.customize-control-theme-element');

        var elementId = element.attr('id');
        var prevValue = $(control.container).find('.azbalac_theme_collector').val();
     
        if (prevValue != '') {
            elementData = JSON.parse(decodeURI(prevValue));
            // todo: if gglfont, get variants and select chosen variant
        } else {
            elementData = {};
        }

        
        // initialize key events to handle select fields
        $(this.container).on('change', '.customize-theme-input-select', function (event) {
            control.onChangeSelectUpdate(event, $(this), elementData);
        });

     
    }


} );
  

})(jQuery);