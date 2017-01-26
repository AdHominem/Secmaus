require "nokogiri"
require "open-uri"
require "json"

base_url = "https://www.bsi.bund.de/"
measure_index_url = base_url + "DE/Themen/ITGrundschutz/ITGrundschutzKataloge/Inhalt/Massnahmenkataloge/"

urls = {
  "Infrastruktur" => "M1Infrastruktur/m1infrastruktur_node.html",
  "Organisation" => "M2Organisation/m2organisation_node.html",
  "Personal" => "M3Personal/m3personal_node.html",
  "Hardware_und_Software" => "M4HardwareundSoftware/m4hardwareundsoftware_node.html",
  "Kommunikation" => "M5Kommunikation/m5kommunikation_node.html",
  "Notfallversorgung" => "M6Notfallversorgung/m6notfallvorsorge_node.html",
}


urls.each do |section, section_url|
  puts "\nCrawling section #{section}"

  url = measure_index_url + section_url
  doc = Nokogiri::HTML(open(url))

  measure_urls = []

  # The last <p> only contains stuff like "Stand: 15. EL Stand 2016"
  measure_url_blocks = doc.css("#content p")[0..-2]
  measure_url_blocks.each do |block| 
    # case 1: 1 child, a link to the base page => add to list
    # case 2: 3 children, link, "-", "entfallen" => ignore
    if block.children.size == 1
      measure_urls << block.children.first["href"]
    end
  end

  measures = []

  # Create absolute urls
  measure_urls.each_with_index do |url, index|
    print "\rCrawling url #{index + 1} of #{measure_urls.length}"

    absolute_url = base_url + url
    doc = Nokogiri::HTML(open(absolute_url))

    main = doc.css("#content")
    title_node = main.css("h1")
    title = title_node.text.strip
    title_node.remove

    main.children[0]
    main.css("a").map do |link|
      # Internal urls look like
      # "DE/Themen/ITGrundschutz/..."
      if link["href"].start_with?("DE")
        # Make url absolute
        link["href"] = base_url + link["href"]
      end
    end
    main.css("img").map do |img|
      # Some images have a relative url
      # that has a "/" in front of it
      if img["src"].start_with?("/")
        # Make url absolute
        img["src"] = base_url + img["src"][1..-1]
      end
    end

    # We don't care about the parent element,
    # just join all the children to one big string
    content = main.children.map(&:to_s).join("")

    measures << {title: title, content: content}
  end

  File.open("#{section}.json", "wb") do |file|
    file.write(measures.to_json)
  end
end
