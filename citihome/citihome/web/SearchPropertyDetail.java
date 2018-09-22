

public class SearchPropertyDetail {

    /*
    * location
    property-type
    bedroom
    range
    range2
    *
    * */
    private String location;
    private String propertyType;
    private String bedroom;
    private String min_price_range;
    private String max_price_range;
    private String min_area_range;
    private String max_area_range;

    public SearchPropertyDetail() {
        this.location = "";
        this.propertyType = "";
        this.bedroom = "";
        this.min_price_range = "";
        this.max_price_range = "";
        this.min_area_range = "";
        this.max_area_range = "";
    }

    public SearchPropertyDetail(String location, String propertyType, String bedroom, String min_price_range, String max_price_range, String min_area_range, String max_area_range) {
        this.location = location;
        this.propertyType = propertyType;
        this.bedroom = bedroom;
        this.min_price_range = min_price_range;
        this.max_price_range = max_price_range;
        this.min_area_range = min_area_range;
        this.max_area_range = max_area_range;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getBedroom() {
        return bedroom;
    }

    public void setBedroom(String bedroom) {
        this.bedroom = bedroom;
    }

    public String getMin_price_range() {
        return min_price_range;
    }

    public void setMin_price_range(String min_price_range) {
        this.min_price_range = min_price_range;
    }

    public String getMax_price_range() {
        return max_price_range;
    }

    public void setMax_price_range(String max_price_range) {
        this.max_price_range = max_price_range;
    }

    public String getMin_area_range() {
        return min_area_range;
    }

    public void setMin_area_range(String min_area_range) {
        this.min_area_range = min_area_range;
    }

    public String getMax_area_range() {
        return max_area_range;
    }

    public void setMax_area_range(String max_area_range) {
        this.max_area_range = max_area_range;
    }
}